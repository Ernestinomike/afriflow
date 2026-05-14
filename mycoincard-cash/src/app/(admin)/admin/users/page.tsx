"use client";
import { motion } from "framer-motion";
import { Search, Filter, MoreVertical, CheckCircle2, XCircle } from "lucide-react";

const USERS = [
  { name: "Demo User", email: "demo@mycoincard.cash", role: "USER", kyc: "Verified", loans: 3, joined: "Jan 5, 2024" },
  { name: "Jordan Lee", email: "user1@example.com", role: "USER", kyc: "Pending", loans: 1, joined: "Feb 12, 2024" },
  { name: "Sam Kim", email: "user2@example.com", role: "USER", kyc: "Verified", loans: 2, joined: "Feb 20, 2024" },
  { name: "Riley Patel", email: "user3@example.com", role: "USER", kyc: "Rejected", loans: 0, joined: "Mar 1, 2024" },
  { name: "Taylor Garcia", email: "user4@example.com", role: "USER", kyc: "Verified", loans: 1, joined: "Mar 8, 2024" },
  { name: "Morgan Smith", email: "user5@example.com", role: "USER", kyc: "Pending", loans: 1, joined: "Mar 15, 2024" },
];

const KYC_COLORS: Record<string, string> = {
  Verified: "text-success",
  Pending: "text-gold",
  Rejected: "text-danger",
};

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-text">User Management</h1>
          <p className="text-sm text-text-soft">Manage all platform users</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input type="text" placeholder="Search users..." className="glass-input !pl-9 !py-2 text-sm w-48" />
          </div>
          <button className="btn-ghost !py-2 text-sm"><Filter className="w-4 h-4" /> Filter</button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass-strong overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted uppercase tracking-wider border-b border-white/[0.06]">
                <th className="text-left p-4 font-medium">User</th>
                <th className="text-left p-4 font-medium">KYC Status</th>
                <th className="text-left p-4 font-medium hidden md:table-cell">Loans</th>
                <th className="text-left p-4 font-medium hidden lg:table-cell">Joined</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {USERS.map((u, i) => (
                <motion.tr
                  key={u.email}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/[0.03] hover:bg-white/[0.02] transition"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center text-xs font-bold">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-text">{u.name}</div>
                        <div className="text-xs text-muted">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-semibold ${KYC_COLORS[u.kyc]}`}>{u.kyc}</span>
                  </td>
                  <td className="p-4 text-text-soft hidden md:table-cell">{u.loans}</td>
                  <td className="p-4 text-muted hidden lg:table-cell">{u.joined}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-xs text-gold hover:underline">View</button>
                      <button className="p-1.5 rounded-lg hover:bg-white/[0.06] text-muted"><MoreVertical className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
