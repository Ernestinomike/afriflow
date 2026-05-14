"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Wallet } from "lucide-react";

export default function LoginPage() {
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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: fd.get("email"), password: fd.get("password") }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error?.message || "Login failed"); return; }
      router.push("/dashboard");
    } catch { setError("Network error"); }
    finally { setLoading(false); }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="glass-strong p-7 sm:p-9">
        <h1 className="font-display font-bold text-2xl text-text text-center mb-1">Welcome Back</h1>
        <p className="text-sm text-text-soft text-center mb-7">Sign in to your account</p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input name="email" type="email" placeholder="Email address" required className="glass-input !pl-11" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input name="password" type={showPass ? "text" : "password"} placeholder="Password" required className="glass-input !pl-11 !pr-11" />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-text">
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-text-soft cursor-pointer">
              <input type="checkbox" className="w-3.5 h-3.5 rounded border-white/10 accent-gold" /> Remember me
            </label>
            <Link href="/forgot-password" className="text-gold hover:underline">Forgot password?</Link>
          </div>

          <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-50">
            {loading ? "Signing in..." : <><ArrowRight className="w-4 h-4" /> Sign In</>}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/[0.08]" />
          <span className="text-xs text-muted">or continue with</span>
          <div className="flex-1 h-px bg-white/[0.08]" />
        </div>

        {/* Wallet option */}
        <button className="btn-ghost w-full">
          <Wallet className="w-4 h-4" /> Connect Wallet
        </button>

        <p className="text-center text-sm text-text-soft mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-gold hover:underline font-medium">Sign Up</Link>
        </p>
      </div>
    </motion.div>
  );
}
