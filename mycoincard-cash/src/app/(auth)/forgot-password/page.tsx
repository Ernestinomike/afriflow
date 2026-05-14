"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="glass-strong p-7 sm:p-9">
        {sent ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h1 className="font-display font-bold text-2xl text-text mb-2">Check Your Email</h1>
            <p className="text-sm text-text-soft mb-6">
              We&apos;ve sent a password reset link to your email address. Please check your inbox and spam folder.
            </p>
            <Link href="/login" className="btn-ghost inline-flex">
              <ArrowLeft className="w-4 h-4" /> Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            <h1 className="font-display font-bold text-2xl text-text text-center mb-1">Reset Password</h1>
            <p className="text-sm text-text-soft text-center mb-7">
              Enter your email and we&apos;ll send a reset link
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input name="email" type="email" placeholder="Email address" required className="glass-input !pl-11" />
              </div>
              <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-50">
                {loading ? "Sending..." : <><ArrowRight className="w-4 h-4" /> Send Reset Link</>}
              </button>
            </form>

            <p className="text-center text-sm text-text-soft mt-6">
              Remember your password?{" "}
              <Link href="/login" className="text-gold hover:underline font-medium">Sign In</Link>
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
}
