"use client";
import { AlertTriangle, Shield, Ban } from "lucide-react";

const ALERTS = [
  { user: "unknown@temp.mail", type: "Multiple failed logins", ip: "203.0.113.99", severity: "High", time: "10m ago" },
  { user: "user3@example.com", type: "Suspicious document upload", ip: "198.51.100.88", severity: "Medium", time: "2h ago" },
  { user: "bot@spam.co", type: "Rapid registration attempts", ip: "192.0.2.50", severity: "High", time: "4h ago" },
];

const SEV: Record<string, string> = { High: "text-danger bg-danger/10", Medium: "text-gold bg-gold/10", Low: "text-info bg-info/10" };

export default function FraudPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display font-bold text-2xl text-text flex items-center gap-2">
        <AlertTriangle className="w-6 h-6 text-danger" /> Fraud Monitoring
      </h1>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="glass p-5 text-center">
          <div className="text-2xl font-display font-bold text-danger">12</div>
          <div className="text-xs text-muted">Active Alerts</div>
        </div>
        <div className="glass p-5 text-center">
          <div className="text-2xl font-display font-bold text-gold">3</div>
          <div className="text-xs text-muted">Blocked IPs</div>
        </div>
        <div className="glass p-5 text-center">
          <div className="text-2xl font-display font-bold text-success">99.2%</div>
          <div className="text-xs text-muted">Legitimate Traffic</div>
        </div>
      </div>

      <div className="space-y-3">
        {ALERTS.map((a, i) => (
          <div key={i} className="glass p-5 flex flex-col sm:flex-row sm:items-center gap-3 border-danger/10">
            <div className="flex-1">
              <div className="font-medium text-text text-sm">{a.type}</div>
              <div className="text-xs text-muted">{a.user} &middot; IP: {a.ip} &middot; {a.time}</div>
            </div>
            <span className={`inline-flex px-2.5 py-1 rounded-lg text-[11px] font-semibold ${SEV[a.severity]}`}>{a.severity}</span>
            <button className="btn-ghost !py-1.5 text-xs text-danger border-danger/20 hover:bg-danger/10">
              <Ban className="w-3.5 h-3.5" /> Block
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
