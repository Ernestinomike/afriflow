"use client";
import { DollarSign, TrendingUp, CreditCard, ArrowUpRight } from "lucide-react";

export default function RevenuePage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display font-bold text-2xl text-text">Revenue Tracking</h1>
      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { label: "This Month", value: "$847,200", icon: DollarSign, change: "+18.5%" },
          { label: "Last Month", value: "$714,300", icon: TrendingUp, change: "+12.1%" },
          { label: "Total Interest", value: "$2.4M", icon: CreditCard, change: "All time" },
          { label: "Processing Fees", value: "$89,100", icon: ArrowUpRight, change: "MTD" },
        ].map((s) => (
          <div key={s.label} className="glass p-5">
            <s.icon className="w-5 h-5 text-gold mb-3" />
            <div className="font-display font-bold text-xl text-text">{s.value}</div>
            <div className="text-xs text-muted">{s.label} &middot; {s.change}</div>
          </div>
        ))}
      </div>
      <div className="glass-strong p-6">
        <h2 className="font-display font-bold text-text mb-4">Revenue Breakdown</h2>
        <div className="space-y-3">
          {[
            { source: "Loan Interest", pct: 68, amt: "$576,096" },
            { source: "Processing Fees", pct: 18, amt: "$152,496" },
            { source: "Late Fees", pct: 9, amt: "$76,248" },
            { source: "Premium Services", pct: 5, amt: "$42,360" },
          ].map((r) => (
            <div key={r.source} className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text">{r.source}</span>
                  <span className="text-muted">{r.amt}</span>
                </div>
                <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                  <div className="h-full rounded-full bg-gold" style={{ width: `${r.pct}%` }} />
                </div>
              </div>
              <span className="text-xs text-gold font-bold w-10 text-right">{r.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
