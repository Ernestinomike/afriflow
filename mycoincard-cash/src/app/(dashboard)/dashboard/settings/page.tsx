"use client";
import { motion } from "framer-motion";
import { User, Lock, Bell, Shield, Smartphone } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-text">Settings</h1>
        <p className="text-sm text-text-soft">Manage your account preferences</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {/* Profile */}
        <div className="glass-strong p-6">
          <h2 className="font-display font-bold text-text flex items-center gap-2 mb-5">
            <User className="w-4 h-4 text-gold" /> Profile Information
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input type="text" defaultValue="Demo" placeholder="First name" className="glass-input" />
            <input type="text" defaultValue="User" placeholder="Last name" className="glass-input" />
            <input type="email" defaultValue="demo@mycoincard.cash" placeholder="Email" className="glass-input" />
            <input type="tel" placeholder="Phone number" className="glass-input" />
            <input type="text" placeholder="City" className="glass-input" />
            <input type="text" placeholder="Country" className="glass-input" />
          </div>
          <button className="btn-gold mt-5 !py-2.5 text-sm">Save Changes</button>
        </div>

        {/* Security */}
        <div className="glass-strong p-6">
          <h2 className="font-display font-bold text-text flex items-center gap-2 mb-5">
            <Lock className="w-4 h-4 text-gold" /> Security
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between glass-soft p-4">
              <div>
                <div className="text-sm font-medium text-text">Change Password</div>
                <div className="text-xs text-muted">Update your account password</div>
              </div>
              <button className="btn-ghost text-xs !py-2">Change</button>
            </div>
            <div className="flex items-center justify-between glass-soft p-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gold" />
                <div>
                  <div className="text-sm font-medium text-text">Two-Factor Authentication</div>
                  <div className="text-xs text-muted">Add extra security to your account</div>
                </div>
              </div>
              <button className="btn-ghost text-xs !py-2">Enable</button>
            </div>
            <div className="flex items-center justify-between glass-soft p-4">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-gold" />
                <div>
                  <div className="text-sm font-medium text-text">Active Sessions</div>
                  <div className="text-xs text-muted">Manage devices logged in to your account</div>
                </div>
              </div>
              <button className="btn-ghost text-xs !py-2">View</button>
            </div>
          </div>
        </div>

        {/* Notifications prefs */}
        <div className="glass-strong p-6">
          <h2 className="font-display font-bold text-text flex items-center gap-2 mb-5">
            <Bell className="w-4 h-4 text-gold" /> Notification Preferences
          </h2>
          <div className="space-y-3">
            {["Email notifications", "SMS alerts", "Push notifications", "Marketing emails"].map((pref) => (
              <label key={pref} className="flex items-center justify-between glass-soft p-4 cursor-pointer">
                <span className="text-sm text-text">{pref}</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-gold rounded" />
              </label>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
