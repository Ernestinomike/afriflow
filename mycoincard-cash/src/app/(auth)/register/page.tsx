"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight, Wallet } from "lucide-react";

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: fd.get("firstName"),
          lastName: fd.get("lastName"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          password: fd.get("password"),
          referralCode: fd.get("referral") || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error?.message || "Registration failed"); return; }
      router.push("/login?registered=1");
    } catch { setError("Network error"); }
    finally { setLoading(false); }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="glass-strong p-7 sm:p-9">
        <h1 className="font-display font-bold text-2xl text-text text-center mb-1">Create Account</h1>
        <p className="text-sm text-text-soft text-center mb-7">Join 12,000+ users getting funded</p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input name="firstName" type="text" placeholder="First name" required className="glass-input !pl-11" />
            </div>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input name="lastName" type="text" placeholder="Last name" required className="glass-input !pl-11" />
            </div>
          </div>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input name="email" type="email" placeholder="Email address" required className="glass-input !pl-11" />
          </div>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input name="phone" type="tel" placeholder="Phone (optional)" className="glass-input !pl-11" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input name="password" type={showPass ? "text" : "password"} placeholder="Password (min 8 chars)" required minLength={8} className="glass-input !pl-11 !pr-11" />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-text">
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <input name="referral" type="text" placeholder="Referral code (optional)" className="glass-input" />

          <label className="flex items-start gap-2 text-xs text-text-soft cursor-pointer">
            <input type="checkbox" required className="w-3.5 h-3.5 rounded border-white/10 accent-gold mt-0.5" />
            <span>I agree to the <Link href="/terms" className="text-gold hover:underline">Terms</Link> and <Link href="/privacy" className="text-gold hover:underline">Privacy Policy</Link></span>
          </label>

          <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-50">
            {loading ? "Creating account..." : <><ArrowRight className="w-4 h-4" /> Create Account</>}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/[0.08]" />
          <span className="text-xs text-muted">or</span>
          <div className="flex-1 h-px bg-white/[0.08]" />
        </div>

        <button className="btn-ghost w-full">
          <Wallet className="w-4 h-4" /> Sign Up with Wallet
        </button>

        <p className="text-center text-sm text-text-soft mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-gold hover:underline font-medium">Sign In</Link>
        </p>
      </div>
    </motion.div>
  );
}
