export const env = {
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "MyCoinCard Cash",
  JWT_SECRET: process.env.JWT_SECRET || "dev-secret-change-me-32+chars-string-please",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  COOKIE: process.env.SESSION_COOKIE_NAME || "mcc_session",
  RATE_LIMIT_PER_MIN: Number(process.env.RATE_LIMIT_PER_MIN || 60),
  IS_PROD: process.env.NODE_ENV === "production"
};
