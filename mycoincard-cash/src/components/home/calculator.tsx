"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatCurrency, monthlyPayment } from "@/lib/utils";

export function LoanCalculator() {
  const [amount, setAmount] = useState(10000);
  const [term, setTerm] = useState(12);
  const rate = 8.5;

  const monthly = monthlyPayment(amount, rate, term);
  const total = monthly * term;
  const interest = total - amount;

  return (
    <section id="calculator" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge-gold mb-4 inline-flex"><Calculator className="w-3 h-3" /> Loan Calculator</span>
          <h2 className="section-title">Calculate Your Payments</h2>
          <p className="text-text-soft mt-3 max-w-lg mx-auto">
            See exactly what your monthly payments will look like. No hidden fees, no surprises.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong max-w-3xl mx-auto p-6 sm:p-10"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Sliders */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-soft">Loan Amount</span>
                  <span className="font-display font-bold gold-text">{formatCurrency(amount)}</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={100000}
                  step={500}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted mt-1">
                  <span>$1,000</span><span>$100,000</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-soft">Repayment Term</span>
                  <span className="font-display font-bold gold-text">{term} months</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={60}
                  step={3}
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted mt-1">
                  <span>3 months</span><span>60 months</span>
                </div>
              </div>

              <div className="glass-soft p-4 flex items-center justify-between">
                <span className="text-sm text-text-soft">Interest Rate</span>
                <span className="font-display font-bold text-gold text-lg">{rate}% APR</span>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col justify-between">
              <div className="space-y-5">
                <div className="glass-soft p-5 text-center">
                  <div className="text-xs text-muted uppercase tracking-wider mb-1">Monthly Payment</div>
                  <div className="text-4xl font-display font-extrabold gold-text">{formatCurrency(monthly)}</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass-soft p-4 text-center">
                    <div className="text-xs text-muted mb-1">Total Repayment</div>
                    <div className="font-display font-bold text-text">{formatCurrency(total)}</div>
                  </div>
                  <div className="glass-soft p-4 text-center">
                    <div className="text-xs text-muted mb-1">Total Interest</div>
                    <div className="font-display font-bold text-text">{formatCurrency(interest)}</div>
                  </div>
                </div>
              </div>

              <Link href="/apply" className="btn-gold w-full mt-6 justify-center">
                Apply for {formatCurrency(amount)} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
