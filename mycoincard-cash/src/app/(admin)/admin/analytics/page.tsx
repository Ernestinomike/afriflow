"use client";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";

const MONTHLY = [
  { month: "Oct", loans: 320, revenue: 145000 },
  { month: "Nov", loans: 410, revenue: 198000 },
  { month: "Dec", loans: 380, revenue: 172000 },
  { month: "Jan", loans: 520, revenue: 256000 },
  { month: "Feb", loans: 610, revenue: 312000 },
  { month: "Mar", loans: 780, revenue: 410000 },
];

export default function AnalyticsPage() {
  const maxRevenue = Math.max(...MONTHLY.map((m) => m.revenue));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-text flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-gold" /> Analytics
        </h1>
        <p className="text-sm text-text-soft">Platform performance metrics</p>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="glass p-5 text-center">
          <Users className="w-5 h-5 text-info mx-auto mb-2" />
          <div className="text-2xl font-display font-bold text-text">12,547</div>
          <div className="text-xs text-muted">Total Users</div>
        </div>
        <div className="glass p-5 text-center">
          <TrendingUp className="w-5 h-5 text-success mx-auto mb-2" />
          <div className="text-2xl font-display font-bold text-text">3,821</div>
          <div className="text-xs text-muted">Loans Processed</div>
        </div>
        <div className="glass p-5 text-center">
          <DollarSign className="w-5 h-5 text-gold mx-auto mb-2" />
          <div className="text-2xl font-display font-bold gold-text">$1.49M</div>
          <div className="text-xs text-muted">Total Revenue</div>
        </div>
      </div>

      {/* Bar chart */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass-strong p-6">
        <h2 className="font-display font-bold text-text mb-6">Monthly Revenue</h2>
        <div className="flex items-end gap-3 h-48">
          {MONTHLY.map((m, i) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-[10px] text-muted font-medium">${(m.revenue / 1000).toFixed(0)}K</div>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(m.revenue / maxRevenue) * 100}%` }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-gold/80 to-gold-light/80"
              />
              <div className="text-[11px] text-muted">{m.month}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Loans chart */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-strong p-6">
        <h2 className="font-display font-bold text-text mb-6">Loan Applications (Monthly)</h2>
        <div className="flex items-end gap-3 h-36">
          {MONTHLY.map((m, i) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-[10px] text-muted font-medium">{m.loans}</div>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(m.loans / Math.max(...MONTHLY.map((x) => x.loans))) * 100}%` }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-info/80 to-info/40"
              />
              <div className="text-[11px] text-muted">{m.month}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
