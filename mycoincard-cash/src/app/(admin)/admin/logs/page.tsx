"use client";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

const LOGS = [
  { action: "USER_LOGIN", user: "admin@mycoincard.cash", ip: "203.0.113.10", time: "5 min ago", agent: "Chrome/121" },
  { action: "LOAN_APPROVED", user: "admin@mycoincard.cash", ip: "203.0.113.10", time: "15 min ago", agent: "Chrome/121" },
  { action: "KYC_VERIFIED", user: "admin@mycoincard.cash", ip: "203.0.113.10", time: "1h ago", agent: "Chrome/121" },
  { action: "USER_REGISTERED", user: "user8@example.com", ip: "198.51.100.45", time: "2h ago", agent: "Safari/17" },
  { action: "LOAN_SUBMITTED", user: "demo@mycoincard.cash", ip: "198.51.100.7", time: "3h ago", agent: "Firefox/122" },
  { action: "PASSWORD_RESET", user: "user3@example.com", ip: "192.0.2.12", time: "5h ago", agent: "Chrome/121" },
];

const ACTION_COLORS: Record<string, string> = {
  USER_LOGIN: "text-info",
  LOAN_APPROVED: "text-success",
  KYC_VERIFIED: "text-success",
  USER_REGISTERED: "text-gold",
  LOAN_SUBMITTED: "text-gold",
  PASSWORD_RESET: "text-danger",
};

export default function LogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-text flex items-center gap-2">
          <Activity className="w-6 h-6 text-gold" /> Activity Logs
        </h1>
        <p className="text-sm text-text-soft">Track all system and user activity</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass-strong overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted uppercase tracking-wider border-b border-white/[0.06]">
                <th className="text-left p-4 font-medium">Action</th>
                <th className="text-left p-4 font-medium">User</th>
                <th className="text-left p-4 font-medium hidden md:table-cell">IP Address</th>
                <th className="text-left p-4 font-medium hidden lg:table-cell">Device</th>
                <th className="text-left p-4 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {LOGS.map((log, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-white/[0.03] hover:bg-white/[0.02] transition"
                >
                  <td className="p-4">
                    <span className={`font-mono text-xs font-semibold ${ACTION_COLORS[log.action] || "text-text"}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4 text-text-soft">{log.user}</td>
                  <td className="p-4 text-muted font-mono text-xs hidden md:table-cell">{log.ip}</td>
                  <td className="p-4 text-muted text-xs hidden lg:table-cell">{log.agent}</td>
                  <td className="p-4 text-muted text-xs">{log.time}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
