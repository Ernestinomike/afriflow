"use client";
import { ArrowRight, Play, Shield, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-radial-gold opacity-60 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <span className="badge-gold">
              <Zap className="w-3 h-3" /> Instant Pre-Approval in 60 seconds
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Smart Funding for Your{" "}
            <span className="gold-text">Financial Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-text-soft max-w-2xl mx-auto leading-relaxed"
          >
            Access competitive personal and business loans with transparent rates,
            instant decisions, and funds in your account within 24 hours.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <Link href="/apply" className="btn-gold text-base px-8 py-4">
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/#calculator" className="btn-ghost text-base px-8 py-4">
              <Play className="w-4 h-4" /> Loan Calculator
            </Link>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center justify-center gap-6 sm:gap-8 mt-12 text-xs text-muted"
          >
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-gold" /> Bank-Level Security</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-gold" /> 60s Decision</span>
            <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-gold" /> 4.9/5 Rating</span>
          </motion.div>
        </div>

        {/* Glass hero card (product preview) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 mx-auto max-w-3xl"
        >
          <div className="glass-strong p-1.5 rounded-3xl">
            <div className="bg-bg/60 rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl sm:text-3xl font-display font-bold gold-text">$50M+</div>
                  <div className="text-xs text-muted mt-1">Funded to Date</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-display font-bold text-text">12K+</div>
                  <div className="text-xs text-muted mt-1">Happy Borrowers</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-display font-bold text-success">98%</div>
                  <div className="text-xs text-muted mt-1">Approval Rate</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
