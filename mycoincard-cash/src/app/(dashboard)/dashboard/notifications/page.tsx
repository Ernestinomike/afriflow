"use client";
import { motion } from "framer-motion";
import { Bell, CheckCircle2, AlertTriangle, Info } from "lucide-react";

const NOTIFICATIONS = [
  { type: "success", title: "Loan approved", body: "Your $5,000 loan has been approved. Funds will be disbursed within 24h.", time: "2 hours ago", read: false },
  { type: "info", title: "Welcome to MyCoinCard Cash", body: "Complete KYC verification to unlock larger loan limits.", time: "1 day ago", read: true },
  { type: "warning", title: "Document required", body: "Please upload a proof of address to complete your verification.", time: "3 days ago", read: true },
  { type: "info", title: "New feature: Wallet Connect", body: "You can now connect your crypto wallet for faster disbursement.", time: "1 week ago", read: true },
];

const ICONS = { success: CheckCircle2, warning: AlertTriangle, info: Info };
const COLORS = { success: "text-success bg-success/10", warning: "text-gold bg-gold/10", info: "text-info bg-info/10" };

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-text">Notifications</h1>
          <p className="text-sm text-text-soft">Stay updated on your account activity</p>
        </div>
        <button className="text-xs text-gold hover:underline">Mark all as read</button>
      </div>

      <div className="space-y-3">
        {NOTIFICATIONS.map((n, i) => {
          const Icon = ICONS[n.type as keyof typeof ICONS] || Info;
          const color = COLORS[n.type as keyof typeof COLORS] || COLORS.info;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`glass p-4 flex gap-4 ${!n.read ? "border-gold/20" : ""}`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display font-semibold text-sm text-text truncate">{n.title}</h3>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-gold shrink-0" />}
                </div>
                <p className="text-xs text-text-soft mt-0.5">{n.body}</p>
                <span className="text-[11px] text-muted mt-1.5 block">{n.time}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
