"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  { q: "How fast can I get approved?", a: "Most applications receive a decision within 60 seconds. Complex cases may take up to 24 hours for manual review." },
  { q: "What are the interest rates?", a: "Our rates start from 6.5% APR for prime borrowers. Your exact rate depends on your credit profile, income, and loan terms." },
  { q: "Can I pay with crypto?", a: "Yes! MyCoinCard Cash supports wallet connections including MetaMask, WalletConnect, Phantom, and more for collateral or repayment." },
  { q: "What documents do I need?", a: "A valid government ID, proof of address (utility bill or bank statement), and proof of income. Upload everything securely through the dashboard." },
  { q: "Is my data secure?", a: "Absolutely. We use 256-bit AES encryption, are PCI DSS compliant, and never share your data with third parties without consent." },
  { q: "How do I repay my loan?", a: "Repayments are automatically deducted from your linked bank account or crypto wallet on your chosen date each month." },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="text-text-soft mt-3">Everything you need to know about MyCoinCard Cash.</p>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-display font-semibold text-sm sm:text-base text-text">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gold transition-transform shrink-0 ml-3 ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-sm text-text-soft leading-relaxed border-t border-white/[0.06] pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
