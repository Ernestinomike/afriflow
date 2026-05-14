"use client";
import { Mail, Send } from "lucide-react";
import { useState } from "react";

export default function BroadcastsPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="font-display font-bold text-2xl text-text flex items-center gap-2">
        <Mail className="w-6 h-6 text-gold" /> Email Broadcasts
      </h1>

      <div className="glass-strong p-6">
        {sent ? (
          <div className="text-center py-8">
            <Send className="w-10 h-10 text-success mx-auto mb-3" />
            <h3 className="font-display font-bold text-lg text-text">Broadcast Queued!</h3>
            <p className="text-sm text-text-soft mt-1">Email will be sent to all selected recipients.</p>
            <button onClick={() => setSent(false)} className="btn-ghost mt-4 text-sm">Send Another</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
            <div>
              <label className="text-sm text-text-soft mb-1 block">Audience</label>
              <select className="glass-input">
                <option value="all">All Users</option>
                <option value="verified">Verified Users Only</option>
                <option value="unverified">Unverified Users</option>
              </select>
            </div>
            <input type="text" placeholder="Subject line" required className="glass-input" />
            <textarea placeholder="Email body (HTML supported)" rows={8} required className="glass-input resize-none" />
            <button type="submit" className="btn-gold"><Send className="w-4 h-4" /> Send Broadcast</button>
          </form>
        )}
      </div>
    </div>
  );
}
