import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { hashPassword, generateReferralCode, signSession, setSessionCookie } from "@/lib/auth";
import { ok, fail, zodFail, withRateLimit } from "@/lib/api";
import { sendEmail } from "@/lib/notify";

const schema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email().max(100),
  phone: z.string().max(20).optional(),
  password: z.string().min(8).max(128),
  referralCode: z.string().max(20).optional(),
});

export async function POST(req: NextRequest) {
  const rl = withRateLimit(req, "register", 5);
  if (rl) return rl;

  let body: z.infer<typeof schema>;
  try {
    body = schema.parse(await req.json());
  } catch (e) {
    return zodFail(e);
  }

  const exists = await db.user.findUnique({ where: { email: body.email } });
  if (exists) return fail("An account with this email already exists.", 409, "EMAIL_EXISTS");

  const passwordHash = await hashPassword(body.password);
  const referralCode = generateReferralCode(body.firstName);

  let referredById: string | undefined;
  if (body.referralCode) {
    const referrer = await db.user.findUnique({ where: { referralCode: body.referralCode } });
    if (referrer) referredById = referrer.id;
  }

  const user = await db.user.create({
    data: {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone || null,
      passwordHash,
      referralCode,
      referredById: referredById || null,
    },
  });

  // Sign session
  const token = await signSession({ sub: user.id, email: user.email, role: user.role as "USER" | "ADMIN" | "SUPPORT" });
  await setSessionCookie(token);

  // Send welcome email (async, non-blocking)
  sendEmail(user.email, "Welcome to MyCoinCard Cash", `Hi ${user.firstName}, welcome aboard!`).catch(() => {});

  return ok({ id: user.id, email: user.email, referralCode: user.referralCode }, { status: 201 });
}
