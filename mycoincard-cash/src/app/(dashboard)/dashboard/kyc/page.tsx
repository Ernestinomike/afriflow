"use client";
import { motion } from "framer-motion";
import { Shield, Upload, CheckCircle2, Camera, FileText, Home } from "lucide-react";
import { useState } from "react";

const KYC_STEPS = [
  { id: 1, title: "Personal Information", desc: "Basic details and address", icon: FileText, done: true },
  { id: 2, title: "Identity Document", desc: "Passport, ID card or driver license", icon: Camera, done: true },
  { id: 3, title: "Selfie Verification", desc: "Take a photo holding your ID", icon: Camera, done: false },
  { id: 4, title: "Proof of Address", desc: "Utility bill or bank statement", icon: Home, done: false },
];

export default function KycPage() {
  const [step, setStep] = useState(3);
  const progress = ((step - 1) / KYC_STEPS.length) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-text flex items-center gap-2">
          <Shield className="w-6 h-6 text-gold" /> KYC Verification
        </h1>
        <p className="text-sm text-text-soft">Complete identity verification to unlock all features</p>
      </div>

      {/* Progress */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass-strong p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-text">Verification Progress</span>
          <span className="text-sm font-display font-bold text-gold">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8 }}
            className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light"
          />
        </div>
      </motion.div>

      {/* Steps */}
      <div className="space-y-3">
        {KYC_STEPS.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`glass p-5 flex items-center gap-4 ${step === s.id ? "border-gold/30" : ""}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.done ? "bg-success/10 text-success" : step === s.id ? "bg-gold/10 text-gold" : "bg-white/[0.04] text-muted"}`}>
              {s.done ? <CheckCircle2 className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-sm text-text">{s.title}</h3>
              <p className="text-xs text-muted">{s.desc}</p>
            </div>
            {step === s.id && !s.done && (
              <button className="btn-gold !py-2 text-xs">
                <Upload className="w-3.5 h-3.5" /> Upload
              </button>
            )}
            {s.done && <span className="text-xs font-semibold text-success">Complete</span>}
          </motion.div>
        ))}
      </div>

      {/* Upload area for current step */}
      {step <= KYC_STEPS.length && !KYC_STEPS[step - 1].done && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-strong border-2 border-dashed border-gold/30 p-10 text-center">
          <Upload className="w-12 h-12 mx-auto text-gold mb-3" />
          <h3 className="font-display font-bold text-text mb-1">Upload {KYC_STEPS[step - 1].title}</h3>
          <p className="text-xs text-muted mb-4">Drag and drop or click to select. JPG, PNG, or PDF, max 10MB.</p>
          <button className="btn-gold">Select File</button>
        </motion.div>
      )}
    </div>
  );
}
