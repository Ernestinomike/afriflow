"use client";
import { motion } from "framer-motion";
import { DollarSign, FileText, Clock, CheckCircle2, TrendingUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const STATS = [
  { label: "Total Funded", value: "$6,500", icon: DollarSign, change: "+12%", color: "text-gold" },
  { label: "Active Loans", value: "2", icon: FileText, change: "+1", color: "text-info" },
  { label: "Pending", value: "1", icon: Clock, change: "0", color: "text-gold-light" },
  { label: "Completed", value: "1", icon: CheckCircle2, change: "+1", color: "text-success" },
];

const RECENT_LOANS = [
  { ref: "LN-ABC123", amount: "$5,000", purpose: "Business expansion", status: "Approved", date: "Jan 15, 2024" },
  { ref: "LN-DEF456", amount: "$1,500", purpose: "Emergency repair", status: "Disbursed", date: "Feb 3, 2024" },
  { ref: "LN-GHI789", amount: "$12,000", purpose: "Education", status: "Under Review", date: "Mar 12, 2024" },
];

const STATUS_COLORS: Record<string, string> = {
  Approved: "bg-success/10 text-success border-success/20",
  Disbursed: "bg-info/10 text-info border-info/20",
  "Under Review": "bg-gold/10 text-gold border-gold/20",
  Submitted: "bg-muted/10 text-muted border-muted/20",
  Rejected: "bg-danger/10 text-danger border-danger/20",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-text">Welcome back, Demo</h1>
          <p className="text-sm text-text-soft">Here&apos;s an overview of your account.</p>
        </div>
        <Link href="/apply" className="btn-gold !py-2.5 text-sm">
          <TrendingUp className="w-4 h-4" /> New Application
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass p-5 hover:border-gold/20 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center ${s.color}`}>
                <s.icon className="w-4 h-4" />
              </div>
              <span className="text-xs text-success font-medium">{s.change}</span>
            </div>
            <div className="font-display font-bold text-xl text-text">{s.value}</div>
            <div className="text-xs text-muted mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent applications */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-strong">
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <h2 className="font-display font-bold text-text">Recent Applications</h2>
          <Link href="/dashboard/loans" className="text-xs text-gold hover:underline flex items-center gap-1">
            View All <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted uppercase tracking-wider border-b border-white/[0.04]">
                <th className="text-left p-4 font-medium">Reference</th>
                <th className="text-left p-4 font-medium">Amount</th>
                <th className="text-left p-4 font-medium hidden sm:table-cell">Purpose</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium hidden md:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_LOANS.map((loan) => (
                <tr key={loan.ref} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition">
                  <td className="p-4 font-mono text-xs text-gold">{loan.ref}</td>
                  <td className="p-4 font-display font-bold text-text">{loan.amount}</td>
                  <td className="p-4 text-text-soft hidden sm:table-cell">{loan.purpose}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${STATUS_COLORS[loan.status] || ""}`}>
                      {loan.status}
                    </span>
                  </td>
                  <td className="p-4 text-muted hidden md:table-cell">{loan.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "Apply for Loan", href: "/apply", desc: "Get funded in 24h" },
          { label: "Upload Documents", href: "/dashboard/documents", desc: "Complete your KYC" },
          { label: "Contact Support", href: "/dashboard/support", desc: "We respond fast" },
        ].map((a) => (
          <Link key={a.label} href={a.href} className="glass p-5 hover:border-gold/30 transition-all group">
            <h3 className="font-display font-bold text-text group-hover:text-gold transition">{a.label}</h3>
            <p className="text-xs text-muted mt-1">{a.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
