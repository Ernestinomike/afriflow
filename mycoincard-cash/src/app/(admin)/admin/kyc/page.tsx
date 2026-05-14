"use client";
import { motion } from "framer-motion";
import { Shield, CheckCircle2, XCircle, Eye } from "lucide-react";

const KYC_ITEMS = [
  { user: "Jordan Lee", email: "user1@example.com", idType: "Passport", submitted: "Mar 14, 2024", status: "Pending" },
  { user: "Morgan Smith", email: "user5@example.com", idType: "National ID", submitted: "Mar 15, 2024", status: "Pending" },
  { user: "Casey Doe", email: "user6@example.com", idType: "Driver License", submitted: "Mar 16, 2024", status: "Pending" },
  { user: "Sam Kim", email: "user2@example.com", idType: "Passport", submitted: "Feb 20, 2024", status: "Verified" },
  { user: "Riley Patel", email: "user3@example.com", idType: "National ID", submitted: "Mar 1, 2024", status: "Rejected" },
];

export default function AdminKycPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-text flex items-center gap-2">
          <Shield className="w-6 h-6 text-gold" /> KYC Reviews
        </h1>
        <p className="text-sm text-text-soft">Verify user identity documents</p>
      </div>

      {/* Queue stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass p-4 text-center">
          <div className="text-2xl font-display font-bold text-gold">3</div>
          <div className="text-xs text-muted">Pending</div>
        </div>
        <div className="glass p-4 text-center">
          <div className="text-2xl font-display font-bold text-success">1</div>
          <div className="text-xs text-muted">Verified Today</div>
        </div>
        <div className="glass p-4 text-center">
          <div className="text-2xl font-display font-bold text-danger">1</div>
          <div className="text-xs text-muted">Rejected Today</div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
        {KYC_ITEMS.map((item, i) => (
          <div key={item.email} className={`glass p-5 flex flex-col sm:flex-row sm:items-center gap-4 ${item.status === "Pending" ? "border-gold/20" : ""}`}>
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center text-sm font-bold shrink-0">
                {item.user.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-text text-sm">{item.user}</div>
                <div className="text-xs text-muted">{item.email} &middot; {item.idType}</div>
              </div>
            </div>
            <div className="text-xs text-muted">{item.submitted}</div>
            <div className="flex items-center gap-2">
              {item.status === "Pending" ? (
                <>
                  <button className="btn-ghost !py-1.5 text-xs"><Eye className="w-3.5 h-3.5" /> Review</button>
                  <button className="p-2 rounded-lg hover:bg-success/10 text-muted hover:text-success"><CheckCircle2 className="w-4 h-4" /></button>
                  <button className="p-2 rounded-lg hover:bg-danger/10 text-muted hover:text-danger"><XCircle className="w-4 h-4" /></button>
                </>
              ) : (
                <span className={`text-xs font-semibold ${item.status === "Verified" ? "text-success" : "text-danger"}`}>
                  {item.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
