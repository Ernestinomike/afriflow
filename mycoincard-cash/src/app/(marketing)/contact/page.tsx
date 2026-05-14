"use client";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="badge-gold mb-4 inline-flex">Get In Touch</span>
          <h1 className="section-title text-4xl sm:text-5xl">Contact Us</h1>
          <p className="text-text-soft mt-3 max-w-md mx-auto">We&apos;re here to help. Reach out anytime.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Mail, label: "Email", value: "support@mycoincard.cash" },
              { icon: Phone, label: "Phone", value: "+1 (800) 555-0123" },
              { icon: MapPin, label: "Office", value: "123 Finance Ave, NYC 10001" },
            ].map((item) => (
              <div key={item.label} className="glass p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-muted uppercase tracking-wider">{item.label}</div>
                  <div className="text-sm text-text font-medium mt-0.5">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="glass-strong p-6 sm:p-8">
              {sent ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-text">Message Sent!</h3>
                  <p className="text-sm text-text-soft mt-2">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="First name" required className="glass-input" />
                    <input type="text" placeholder="Last name" required className="glass-input" />
                  </div>
                  <input type="email" placeholder="Email address" required className="glass-input" />
                  <input type="text" placeholder="Subject" required className="glass-input" />
                  <textarea placeholder="Your message..." rows={5} required className="glass-input resize-none" />
                  <button type="submit" className="btn-gold w-full">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
