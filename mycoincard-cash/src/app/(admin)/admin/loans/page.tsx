"use client";
import { motion } from "framer-motion";
import { Search, CheckCircle2, XCircle, Eye } from "lucide-react";

const LOANS = [
  { ref: "LN-ABC123", user: "Demo User", amount: "$5,000", term: "12m", status: "Approved", date: "Jan 15, 2024" },
  { ref: "LN-DEF456", user: "Demo User", amount: "$1,500", term: "6m", status: "Disbursed", date: "Feb 3, 2024" },
  { ref: "LN-GHI789", user: "Demo User", amount: "$12,000", term: "24m", status: "Under Review", date: "Mar 12, 2024" },
  { ref: "LN-JKL012", user: "Jordan Lee", amount: "$8,500", term: "18m", status: "Submitted", date: "Mar 14, 2024" },
  { ref: "LN-MNO345", user: "Sam Kim", amount: "$3,200", term: "12m", status: "Approved", date: "Mar 15, 2024" },
  { ref: "LN-PQR678", user: "Riley Patel", amount: "$15,000", term: "36m", status: "Rejected", date: "Mar 16, 2024" },
];

const STATUS_COLORS: Record<string, string> = {
  Approved: "bg-success/10 text-success border-success/20",
  Disbursed: "bg-info/10 text-info border-info/20",
  "Under Review": "bg-gold/10 text-gold border-gold/20",
  Submitted: "bg-muted/10 text-muted border-muted/20",
  Rejected: "bg-danger/10 text-danger border-danger/20",
};

export default function AdminLoansPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-text">Loan Applications</h1>
          <p className="text-sm text-text-soft">Review, approve, or reject loan applications</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input type="text" placeholder="Search by ref or user..." className="glass-input !pl-9 !py-2 text-sm w-56" />
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass-strong overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted uppercase tracking-wider border-b border-white/[0.06]">
                <th className="text-left p-4 font-medium">Reference</th>
                <th className="text-left p-4 font-medium">User</th>
                <th className="text-left p-4 font-medium">Amount</th>
                <th className="text-left p-4 font-medium hidden md:table-cell">Term</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {LOANS.map((loan, i) => (
                <motion.tr
                  key={loan.ref}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-white/[0.03] hover:bg-white/[0.02] transition"
                >
                  <td className="p-4 font-mono text-xs text-gold">{loan.ref}</td>
                  <td className="p-4 text-text">{loan.user}</td>
                  <td className="p-4 font-display font-bold text-text">{loan.amount}</td>
                  <td className="p-4 text-muted hidden md:table-cell">{loan.term}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${STATUS_COLORS[loan.status]}`}>
                      {loan.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="p-1.5 rounded-lg hover:bg-white/[0.06] text-muted hover:text-text" title="View">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      {(loan.status === "Submitted" || loan.status === "Under Review") && (
                        <>
                          <button className="p-1.5 rounded-lg hover:bg-success/10 text-muted hover:text-success" title="Approve">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-danger/10 text-muted hover:text-danger" title="Reject">
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
