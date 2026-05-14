"use client";
import { Settings, Globe, Shield, Bell } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display font-bold text-2xl text-text flex items-center gap-2">
        <Settings className="w-6 h-6 text-gold" /> Platform Settings
      </h1>

      <div className="space-y-4">
        <div className="glass-strong p-6">
          <h2 className="font-display font-bold text-text flex items-center gap-2 mb-5">
            <Globe className="w-4 h-4 text-gold" /> General
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted block mb-1">Platform Name</label>
              <input type="text" defaultValue="MyCoinCard Cash" className="glass-input" />
            </div>
            <div>
              <label className="text-xs text-muted block mb-1">Support Email</label>
              <input type="email" defaultValue="support@mycoincard.cash" className="glass-input" />
            </div>
            <div>
              <label className="text-xs text-muted block mb-1">Default Interest Rate (%)</label>
              <input type="number" defaultValue="8.5" step="0.1" className="glass-input" />
            </div>
            <div>
              <label className="text-xs text-muted block mb-1">Max Loan Amount ($)</label>
              <input type="number" defaultValue="100000" className="glass-input" />
            </div>
          </div>
          <button className="btn-gold mt-5 text-sm !py-2.5">Save Settings</button>
        </div>

        <div className="glass-strong p-6">
          <h2 className="font-display font-bold text-text flex items-center gap-2 mb-5">
            <Shield className="w-4 h-4 text-gold" /> Security
          </h2>
          <div className="space-y-3">
            {["Require email verification", "Enable 2FA for admins", "IP rate limiting", "Block disposable emails"].map((s) => (
              <label key={s} className="flex items-center justify-between glass-soft p-4 cursor-pointer">
                <span className="text-sm text-text">{s}</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-gold rounded" />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
