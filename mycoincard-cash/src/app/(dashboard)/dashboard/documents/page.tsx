"use client";
import { motion } from "framer-motion";
import { Upload, FileText, CheckCircle2, Clock, Trash2 } from "lucide-react";
import { useState } from "react";

const DOCS = [
  { name: "passport_scan.pdf", type: "ID Front", size: "1.2 MB", date: "Jan 10, 2024", status: "Verified" },
  { name: "utility_bill.pdf", type: "Proof of Address", size: "850 KB", date: "Jan 10, 2024", status: "Verified" },
  { name: "payslip_dec.pdf", type: "Payslip", size: "320 KB", date: "Feb 1, 2024", status: "Pending" },
];

export default function DocumentsPage() {
  const [dragging, setDragging] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-text">My Documents</h1>
        <p className="text-sm text-text-soft">Upload and manage your verification documents</p>
      </div>

      {/* Upload zone */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={() => setDragging(false)}
        className={`glass-strong border-2 border-dashed p-10 text-center transition-all cursor-pointer ${dragging ? "border-gold bg-gold/[0.04]" : "border-white/[0.10]"}`}
      >
        <Upload className="w-10 h-10 mx-auto text-gold mb-3" />
        <h3 className="font-display font-bold text-text mb-1">Drop files here or click to upload</h3>
        <p className="text-xs text-muted">Supported: PDF, JPG, PNG &middot; Max 10MB</p>
        <input type="file" className="hidden" multiple accept=".pdf,.jpg,.jpeg,.png" />
      </motion.div>

      {/* Documents list */}
      <div className="space-y-3">
        {DOCS.map((doc, i) => (
          <motion.div
            key={doc.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass p-4 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-text truncate">{doc.name}</div>
              <div className="text-xs text-muted">{doc.type} &middot; {doc.size} &middot; {doc.date}</div>
            </div>
            <div className="flex items-center gap-3">
              {doc.status === "Verified" ? (
                <span className="text-[11px] font-semibold text-success flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-gold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Pending
                </span>
              )}
              <button className="p-1.5 rounded-lg hover:bg-danger/10 text-muted hover:text-danger transition">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
