"use client";
import { motion } from "framer-motion";
import { UserPlus, FileCheck, Clock, Banknote } from "lucide-react";

const STEPS = [
  { icon: UserPlus, title: "Create Account", desc: "Sign up in 30 seconds with email or crypto wallet. Quick & secure." },
  { icon: FileCheck, title: "Apply & Verify", desc: "Complete your loan application and upload ID documents for KYC." },
  { icon: Clock, title: "Instant Decision", desc: "Get approved within 60 seconds with our advanced scoring engine." },
  { icon: Banknote, title: "Receive Funds", desc: "Money arrives in your bank or wallet within 24 hours of approval." },
];

export function Process() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="section-title">How It Works</h2>
          <p className="text-text-soft mt-3 max-w-md mx-auto">
            From application to funds in your account — streamlined and transparent.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="glass p-6 text-center group hover:border-gold/30 transition-all relative"
            >
              {/* Step number */}
              <div className="absolute top-4 right-4 text-[11px] font-bold text-muted/40 font-display">
                0{i + 1}
              </div>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold/10 text-gold mb-4 group-hover:bg-gold/20 transition">
                <step.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-text mb-2">{step.title}</h3>
              <p className="text-sm text-text-soft leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
