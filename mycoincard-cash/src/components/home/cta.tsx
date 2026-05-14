"use client";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function CTA() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong p-8 sm:p-14 text-center relative overflow-hidden"
        >
          {/* Radial glow bg */}
          <div className="absolute inset-0 bg-radial-gold opacity-40 pointer-events-none" />

          <div className="relative">
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl">
              Ready to Get <span className="gold-text">Funded</span>?
            </h2>
            <p className="text-text-soft mt-4 max-w-lg mx-auto">
              Join thousands who&apos;ve already secured competitive funding.
              Apply in under 2 minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link href="/apply" className="btn-gold text-base px-8 py-4">
                Start Application <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/register" className="btn-ghost text-base px-8 py-4">
                Create Free Account
              </Link>
            </div>

            {/* Email subscription */}
            <div className="mt-10 max-w-md mx-auto">
              <p className="text-xs text-muted mb-3">Get notified about rates & exclusive offers</p>
              {subscribed ? (
                <div className="glass-soft p-4 text-sm text-success font-medium">
                  Subscribed successfully! We&apos;ll keep you updated.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="glass-input !pl-10 !py-3"
                    />
                  </div>
                  <button type="submit" className="btn-gold !py-3 !px-5 shrink-0">
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
