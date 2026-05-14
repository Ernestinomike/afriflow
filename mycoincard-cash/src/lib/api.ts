import { NextResponse } from "next/server";
import { z, ZodSchema } from "zod";
import { rateLimit, clientIp } from "./security";
import { getSession } from "./auth";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data }, init);
}
export function fail(message: string, status = 400, code?: string) {
  return NextResponse.json({ ok: false, error: { message, code } }, { status });
}

export async function parseBody<T>(req: Request, schema: ZodSchema<T>): Promise<T> {
  const json = await req.json().catch(() => ({}));
  return schema.parse(json);
}

export function withRateLimit(req: Request, key: string, limit?: number) {
  const ip = clientIp(req.headers);
  const r = rateLimit(`${key}:${ip}`, limit);
  if (!r.ok) return fail("Too many requests. Slow down.", 429, "RATE_LIMITED");
  return null;
}

export async function requireApiUser() {
  const s = await getSession();
  if (!s) return { error: fail("Unauthenticated", 401, "UNAUTH"), user: null as never };
  return { error: null, user: s };
}

export async function requireApiAdmin() {
  const s = await getSession();
  if (!s) return { error: fail("Unauthenticated", 401, "UNAUTH"), user: null as never };
  if (s.role !== "ADMIN") return { error: fail("Forbidden", 403, "FORBIDDEN"), user: null as never };
  return { error: null, user: s };
}

/** Convert a Zod parse error to a user-friendly response. */
export function zodFail(e: unknown) {
  if (e instanceof z.ZodError) {
    const msg = e.errors.map((er) => `${er.path.join(".")}: ${er.message}`).join("; ");
    return fail(msg, 400, "VALIDATION");
  }
  return fail("Invalid request", 400);
}
