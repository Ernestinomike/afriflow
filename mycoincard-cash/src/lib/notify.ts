/**
 * Email + SMS notification stubs. Swap stubs for real provider
 * (Resend, Postmark, Twilio) when env vars are configured.
 */
export async function sendEmail(to: string, subject: string, body: string) {
  if (!process.env.SMTP_HOST) {
    console.log(`[email] to=${to} subject="${subject}"`);
    return { ok: true, simulated: true };
  }
  // Real implementation: use nodemailer or Resend SDK here.
  return { ok: true, simulated: false };
}

export async function sendSms(to: string, body: string) {
  if (!process.env.TWILIO_ACCOUNT_SID) {
    console.log(`[sms] to=${to} body="${body}"`);
    return { ok: true, simulated: true };
  }
  return { ok: true, simulated: false };
}
