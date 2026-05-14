import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { db } from "./db";
import { env } from "./env";

type Role = "USER" | "ADMIN" | "SUPPORT";

const secret = new TextEncoder().encode(env.JWT_SECRET);

export type SessionPayload = {
  sub: string;
  email: string;
  role: Role;
};

export async function hashPassword(plain: string) {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

export async function signSession(payload: SessionPayload) {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRES_IN)
    .setIssuer("mycoincard.cash")
    .sign(secret);
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret, { issuer: "mycoincard.cash" });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const c = await cookies();
  c.set(env.COOKIE, token, {
    httpOnly: true,
    secure: env.IS_PROD,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function clearSessionCookie() {
  const c = await cookies();
  c.delete(env.COOKIE);
}

export async function getSession(): Promise<SessionPayload | null> {
  const c = await cookies();
  const token = c.get(env.COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;
  return db.user.findUnique({ where: { id: session.sub } });
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHENTICATED");
  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") throw new Error("FORBIDDEN");
  return user;
}

export function generateReferralCode(seed: string) {
  const base = seed.replace(/[^a-zA-Z0-9]/g, "").slice(0, 5).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MCC-${base}${rand}`;
}
