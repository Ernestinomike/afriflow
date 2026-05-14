import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { verifyPassword, signSession, setSessionCookie } from "@/lib/auth";
import { ok, fail, zodFail, withRateLimit } from "@/lib/api";
import { clientIp } from "@/lib/security";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const rl = withRateLimit(req, "login", 10);
  if (rl) return rl;

  let body: z.infer<typeof schema>;
  try {
    body = schema.parse(await req.json());
  } catch (e) {
    return zodFail(e);
  }

  const user = await db.user.findUnique({ where: { email: body.email } });
  if (!user) return fail("Invalid email or password.", 401, "INVALID_CREDENTIALS");

  const valid = await verifyPassword(body.password, user.passwordHash);
  if (!valid) return fail("Invalid email or password.", 401, "INVALID_CREDENTIALS");

  // Update last login info
  const ip = clientIp(req.headers);
  const ua = req.headers.get("user-agent") || "";
  await db.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date(), lastLoginIp: ip, lastUserAgent: ua },
  });

  // Create audit log
  await db.auditLog.create({
    data: { userId: user.id, action: "USER_LOGIN", ip, userAgent: ua },
  });

  const token = await signSession({ sub: user.id, email: user.email, role: user.role as "USER" | "ADMIN" | "SUPPORT" });
  await setSessionCookie(token);

  return ok({ id: user.id, email: user.email, role: user.role, firstName: user.firstName });
}
