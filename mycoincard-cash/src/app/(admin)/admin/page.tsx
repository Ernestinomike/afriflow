"use client";
import { motion } from "framer-motion";
import { Users, FileText, DollarSign, AlertTriangle, TrendingUp, ArrowUpRight } from "lucide-react";

const STATS = [
  { label: "Total Users", value: "12,547", icon: Users, change: "+340 this week", color: "text-info" },
  { label: "Active Loans", value: "3,821", icon: FileText, change: "+127 this week", color: "text-gold" },
  { label: "Revenue (MTD)", value: "$847,200", icon: DollarSign, change: "+18.5%", color: "text-success" },
  { label: "Fraud Alerts", value: "12", icon: AlertTriangle, change: "-3 from last week", color: "text-danger" },
];

const RECENT_APPS = [
  { user: "Jordan Lee", email: "jordan@email.com", amount: "$8,500", status: "Pending", time: "2m ago" },
  { user: "Sam Kim", email: "sam@email.com", amount: "$3,200", status: "Approved", time: "15m ago" },
  { user: "Riley Patel", email: "riley@email.com", amount: "$15,000", status: "Under Review", time: "1h ago" },
  { user: "Taylor Garcia", email: "taylor@email.com", amount: "$6,800", status: "Rejected", time: "2h ago" },
  { user: "Morgan Smith", email: "morgan@email.com", amount: "$2,100", status: "Approved", time: "3h ago" },
];

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-gold/10 text-gold",
  Approved: "bg-success/10 text-success",
  "Under Review": "bg-info/10 text-info",
  Rejected: "bg-danger/10 text-danger",
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-text">Admin Dashboard</h1>
        <p className="text-sm text-text-soft">Platform overview and quick actions</p>
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
              <TrendingUp className="w-3.5 h-3.5 text-success" />
            </div>
            <div className="font-display font-bold text-xl text-text">{s.value}</div>
            <div className="text-[11px] text-muted mt-0.5">{s.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent applications table */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-strong">
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <h2 className="font-display font-bold text-text">Recent Applications</h2>
          <a href="/admin/loans" className="text-xs text-gold hover:underline flex items-center gap-1">
            View All <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted uppercase tracking-wider border-b border-white/[0.04]">
                <th className="text-left p-4 font-medium">User</th>
                <th className="text-left p-4 font-medium">Amount</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium hidden sm:table-cell">Time</th>
                <th className="text-right p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_APPS.map((app) => (
                <tr key={app.email} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition">
                  <td className="p-4">
                    <div className="font-medium text-text">{app.user}</div>
                    <div className="text-xs text-muted">{app.email}</div>
                  </td>
                  <td className="p-4 font-display font-bold text-text">{app.amount}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-[11px] font-semibold ${STATUS_COLORS[app.status]}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 text-muted hidden sm:table-cell">{app.time}</td>
                  <td className="p-4 text-right">
                    <button className="text-xs text-gold hover:underline">Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick panels */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="glass p-5">
          <h3 className="font-display font-bold text-sm text-text mb-2">KYC Queue</h3>
          <div className="text-3xl font-display font-bold text-gold mb-1">23</div>
          <p className="text-xs text-muted">Pending verifications</p>
        </div>
        <div className="glass p-5">
          <h3 className="font-display font-bold text-sm text-text mb-2">Open Tickets</h3>
          <div className="text-3xl font-display font-bold text-info mb-1">8</div>
          <p className="text-xs text-muted">Awaiting response</p>
        </div>
        <div className="glass p-5">
          <h3 className="font-display font-bold text-sm text-text mb-2">Disbursement Queue</h3>
          <div className="text-3xl font-display font-bold text-success mb-1">5</div>
          <p className="text-xs text-muted">Ready to process</p>
        </div>
      </div>
    </div>
  );
}
