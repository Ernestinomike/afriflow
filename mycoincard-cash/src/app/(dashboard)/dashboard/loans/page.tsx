"use client";
import { motion } from "framer-motion";
import { FileText, Plus } from "lucide-react";
import Link from "next/link";

const LOANS = [
  { ref: "LN-ABC123", amount: 5000, term: 12, rate: 8.5, purpose: "Business expansion", status: "Approved", date: "2024-01-15" },
  { ref: "LN-DEF456", amount: 1500, term: 6, rate: 8.5, purpose: "Emergency repair", status: "Disbursed", date: "2024-02-03" },
  { ref: "LN-GHI789", amount: 12000, term: 24, rate: 8.5, purpose: "Education", status: "Under Review", date: "2024-03-12" },
];

const STATUS_COLORS: Record<string, string> = {
  Approved: "bg-success/10 text-success border-success/20",
  Disbursed: "bg-info/10 text-info border-info/20",
  "Under Review": "bg-gold/10 text-gold border-gold/20",
  Submitted: "bg-muted/10 text-muted border-muted/20",
  Rejected: "bg-danger/10 text-danger border-danger/20",
};

export default function LoansPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-text">My Applications</h1>
          <p className="text-sm text-text-soft">Track all your loan applications</p>
        </div>
        <Link href="/apply" className="btn-gold !py-2.5 text-sm">
          <Plus className="w-4 h-4" /> New Loan
        </Link>
      </div>

      <div className="space-y-4">
        {LOANS.map((loan, i) => (
          <motion.div
            key={loan.ref}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass p-5 hover:border-gold/20 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display font-bold text-text">${loan.amount.toLocaleString()}</div>
                  <div className="text-xs text-muted mt-0.5">{loan.purpose} &middot; {loan.term} months &middot; {loan.rate}% APR</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex px-3 py-1.5 rounded-lg text-[11px] font-semibold border ${STATUS_COLORS[loan.status]}`}>
                  {loan.status}
                </span>
                <span className="text-xs text-muted font-mono">{loan.ref}</span>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-4">
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light transition-all"
                  style={{
                    width: loan.status === "Disbursed" ? "100%" : loan.status === "Approved" ? "75%" : loan.status === "Under Review" ? "50%" : "25%"
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-muted mt-1.5">
                <span>Submitted</span><span>Reviewing</span><span>Approved</span><span>Funded</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
