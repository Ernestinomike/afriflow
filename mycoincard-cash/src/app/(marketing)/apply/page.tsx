"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, DollarSign, User, FileText, CheckCircle2, Wallet } from "lucide-react";
import Link from "next/link";
import { formatCurrency, monthlyPayment } from "@/lib/utils";

const STEPS = ["Loan Details", "Personal Info", "Employment", "Review & Submit"];

export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState(10000);
  const [term, setTerm] = useState(12);
  const [submitted, setSubmitted] = useState(false);

  const monthly = monthlyPayment(amount, 8.5, term);

  if (submitted) {
    return (
      <div className="pt-28 pb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-lg text-center glass-strong p-10">
          <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="font-display font-bold text-2xl text-text mb-2">Application Submitted!</h1>
          <p className="text-text-soft mb-6">We&apos;ll review your application and get back to you within 60 seconds to 24 hours.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/dashboard" className="btn-gold">Go to Dashboard</Link>
            <Link href="/" className="btn-ghost">Back Home</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="badge-gold mb-4 inline-flex"><DollarSign className="w-3 h-3" /> Loan Application</span>
          <h1 className="section-title text-3xl sm:text-4xl">Apply for Funding</h1>
          <p className="text-text-soft mt-2">Complete the form below. Most applications are decided instantly.</p>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s, i) => (
              <div key={s} className={`flex items-center gap-2 text-xs font-medium ${i <= step ? "text-gold" : "text-muted"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ${i < step ? "bg-gold text-black" : i === step ? "border-2 border-gold text-gold" : "border border-white/10 text-muted"}`}>
                  {i < step ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className="hidden sm:inline">{s}</span>
              </div>
            ))}
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
          </div>
        </div>

        {/* Form steps */}
        <div className="glass-strong p-6 sm:p-9">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <label className="text-sm text-text-soft block mb-2">How much do you need?</label>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-display font-bold gold-text">{formatCurrency(amount)}</span>
                  </div>
                  <input type="range" min={1000} max={100000} step={500} value={amount} onChange={(e) => setAmount(+e.target.value)} className="w-full mt-3" />
                  <div className="flex justify-between text-xs text-muted mt-1"><span>$1,000</span><span>$100,000</span></div>
                </div>
                <div>
                  <label className="text-sm text-text-soft block mb-2">Repayment Term</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[6, 12, 24, 36].map((t) => (
                      <button key={t} type="button" onClick={() => setTerm(t)} className={`py-3 rounded-xl text-sm font-medium transition ${term === t ? "bg-gold/10 text-gold border border-gold/30" : "glass-soft text-text-soft hover:text-text"}`}>
                        {t} months
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-text-soft block mb-2">Loan Purpose</label>
                  <select className="glass-input">
                    <option value="">Select purpose...</option>
                    <option>Business expansion</option>
                    <option>Home renovation</option>
                    <option>Education</option>
                    <option>Medical expenses</option>
                    <option>Debt consolidation</option>
                    <option>Travel</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="glass-soft p-4 flex items-center justify-between">
                  <span className="text-sm text-muted">Est. Monthly Payment</span>
                  <span className="font-display font-bold text-lg gold-text">{formatCurrency(monthly)}</span>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="First name" className="glass-input" />
                  <input type="text" placeholder="Last name" className="glass-input" />
                </div>
                <input type="email" placeholder="Email address" className="glass-input" />
                <input type="tel" placeholder="Phone number" className="glass-input" />
                <input type="date" placeholder="Date of birth" className="glass-input" />
                <input type="text" placeholder="Address" className="glass-input" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="City" className="glass-input" />
                  <input type="text" placeholder="Country" className="glass-input" />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <select className="glass-input">
                  <option value="">Employment status...</option>
                  <option>Full-time employed</option>
                  <option>Part-time employed</option>
                  <option>Self-employed</option>
                  <option>Freelancer</option>
                  <option>Business owner</option>
                  <option>Unemployed</option>
                  <option>Retired</option>
                </select>
                <input type="text" placeholder="Company / Employer name" className="glass-input" />
                <input type="text" placeholder="Job title" className="glass-input" />
                <input type="number" placeholder="Monthly income (USD)" className="glass-input" />
                <input type="number" placeholder="Monthly expenses (USD)" className="glass-input" />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h3 className="font-display font-bold text-lg text-text">Review Your Application</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="glass-soft p-4">
                    <div className="text-xs text-muted">Loan Amount</div>
                    <div className="font-display font-bold text-lg text-text">{formatCurrency(amount)}</div>
                  </div>
                  <div className="glass-soft p-4">
                    <div className="text-xs text-muted">Term</div>
                    <div className="font-display font-bold text-lg text-text">{term} months</div>
                  </div>
                  <div className="glass-soft p-4">
                    <div className="text-xs text-muted">Monthly Payment</div>
                    <div className="font-display font-bold text-lg gold-text">{formatCurrency(monthly)}</div>
                  </div>
                  <div className="glass-soft p-4">
                    <div className="text-xs text-muted">Interest Rate</div>
                    <div className="font-display font-bold text-lg text-text">8.5% APR</div>
                  </div>
                </div>
                <label className="flex items-start gap-2 text-xs text-text-soft">
                  <input type="checkbox" required className="w-4 h-4 accent-gold mt-0.5 rounded" />
                  <span>I confirm all information is accurate and agree to the <Link href="/terms" className="text-gold hover:underline">Terms</Link> and <Link href="/privacy" className="text-gold hover:underline">Privacy Policy</Link>.</span>
                </label>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.06]">
            <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="btn-ghost disabled:opacity-30 text-sm">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep((s) => s + 1)} className="btn-gold text-sm">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={() => setSubmitted(true)} className="btn-gold text-sm">
                Submit Application <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
