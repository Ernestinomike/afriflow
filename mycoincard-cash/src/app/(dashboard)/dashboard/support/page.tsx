"use client";
import { motion } from "framer-motion";
import { MessageSquare, Send, Plus } from "lucide-react";
import { useState } from "react";

const TICKETS = [
  {
    ref: "TK-A1B2C3",
    subject: "How long does disbursement take?",
    status: "Open",
    messages: [
      { author: "You", body: "Hi, when will my approved loan be disbursed?", time: "2 days ago" },
      { author: "Support", body: "Hello! Disbursement typically completes within 24 hours after approval.", time: "1 day ago" },
    ],
  },
];

export default function SupportPage() {
  const [activeTicket, setActiveTicket] = useState(0);
  const [msg, setMsg] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-text">Support</h1>
          <p className="text-sm text-text-soft">Get help from our team</p>
        </div>
        <button className="btn-gold !py-2.5 text-sm"><Plus className="w-4 h-4" /> New Ticket</button>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Ticket list */}
        <div className="space-y-2">
          {TICKETS.map((t, i) => (
            <button
              key={t.ref}
              onClick={() => setActiveTicket(i)}
              className={`w-full glass p-4 text-left hover:border-gold/20 transition ${activeTicket === i ? "border-gold/30" : ""}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="w-3.5 h-3.5 text-gold" />
                <span className="font-mono text-[11px] text-muted">{t.ref}</span>
                <span className="ml-auto text-[11px] font-semibold text-success">{t.status}</span>
              </div>
              <p className="text-sm text-text font-medium truncate">{t.subject}</p>
            </button>
          ))}
        </div>

        {/* Chat */}
        <div className="lg:col-span-2 glass-strong flex flex-col h-[500px]">
          <div className="p-4 border-b border-white/[0.06]">
            <h3 className="font-display font-bold text-sm text-text">{TICKETS[activeTicket].subject}</h3>
            <span className="text-[11px] text-muted">{TICKETS[activeTicket].ref}</span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {TICKETS[activeTicket].messages.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <div className={`max-w-[80%] ${m.author === "You" ? "ml-auto" : ""}`}>
                  <div className={`p-3 rounded-2xl text-sm ${m.author === "You" ? "bg-gold/10 text-text border border-gold/20" : "bg-white/[0.04] text-text-soft border border-white/[0.08]"}`}>
                    {m.body}
                  </div>
                  <div className="text-[10px] text-muted mt-1 px-1">{m.author} &middot; {m.time}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="p-4 border-t border-white/[0.06]">
            <form onSubmit={(e) => { e.preventDefault(); setMsg(""); }} className="flex gap-2">
              <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type a message..." className="glass-input flex-1" />
              <button type="submit" className="btn-gold !px-4"><Send className="w-4 h-4" /></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
