"use client";
import { MessageSquare } from "lucide-react";

const TICKETS = [
  { ref: "TK-A1B2C3", user: "Demo User", subject: "How long does disbursement take?", status: "Open", date: "2 days ago" },
  { ref: "TK-D4E5F6", user: "Jordan Lee", subject: "KYC rejected - please help", status: "Open", date: "1 day ago" },
  { ref: "TK-G7H8I9", user: "Sam Kim", subject: "Wrong amount disbursed", status: "Pending", date: "4h ago" },
  { ref: "TK-J0K1L2", user: "Taylor Garcia", subject: "Cannot login to account", status: "Resolved", date: "5 days ago" },
];

const STATUS_C: Record<string, string> = { Open: "text-success", Pending: "text-gold", Resolved: "text-muted" };

export default function TicketsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display font-bold text-2xl text-text flex items-center gap-2">
        <MessageSquare className="w-6 h-6 text-gold" /> Support Tickets
      </h1>
      <div className="space-y-3">
        {TICKETS.map((t) => (
          <div key={t.ref} className="glass p-5 flex flex-col sm:flex-row sm:items-center gap-3 hover:border-gold/20 transition">
            <div className="flex-1">
              <div className="font-medium text-text text-sm">{t.subject}</div>
              <div className="text-xs text-muted mt-0.5">{t.user} &middot; {t.ref} &middot; {t.date}</div>
            </div>
            <span className={`text-xs font-semibold ${STATUS_C[t.status]}`}>{t.status}</span>
            <button className="btn-ghost !py-1.5 text-xs">Reply</button>
          </div>
        ))}
      </div>
    </div>
  );
}
