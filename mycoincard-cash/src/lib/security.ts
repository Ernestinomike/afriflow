/**
 * Lightweight security helpers — rate limiting, input sanitization,
 * CSRF tokens. In-memory implementations are fine for a single
 * instance; swap for Redis/Upstash in production.
 */
import { env } from "./env";

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, limit = env.RATE_LIMIT_PER_MIN, windowMs = 60_000) {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now > b.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, resetIn: windowMs };
  }
  if (b.count >= limit) return { ok: false, remaining: 0, resetIn: b.resetAt - now };
  b.count += 1;
  return { ok: true, remaining: limit - b.count, resetIn: b.resetAt - now };
}

/** Strip dangerous tags / attributes from user-provided strings. */
export function sanitize(input: string, maxLen = 5000): string {
  if (typeof input !== "string") return "";
  return input
    .slice(0, maxLen)
    .replace(/<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, "")
    .replace(/<\s*\/?\s*(iframe|object|embed|svg|style|link|meta)[^>]*>/gi, "")
    .replace(/on[a-z]+\s*=\s*"[^"]*"/gi, "")
    .replace(/on[a-z]+\s*=\s*'[^']*'/gi, "")
    .replace(/javascript:/gi, "")
    .trim();
}

export function maskEmail(email: string) {
  const [u, d] = email.split("@");
  if (!u || !d) return email;
  return u.slice(0, 2) + "***@" + d;
}

export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "0.0.0.0"
  );
}

export function generateCsrfToken() {
  const a = new Uint8Array(24);
  crypto.getRandomValues(a);
  return Array.from(a, (b) => b.toString(16).padStart(2, "0")).join("");
}
