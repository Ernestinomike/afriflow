"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const REVIEWS = [
  { name: "Sarah M.", role: "Small Business Owner", text: "MyCoinCard Cash funded my expansion in just 2 days. The process was seamless and the rates were better than my bank offered.", rating: 5 },
  { name: "James T.", role: "Freelance Developer", text: "I love that I can connect my crypto wallet. The approval was instant and the team was incredibly responsive.", rating: 5 },
  { name: "Aisha K.", role: "Marketing Director", text: "Finally a fintech platform that feels premium AND trustworthy. The dashboard is beautiful and tracking my loan is effortless.", rating: 5 },
  { name: "David R.", role: "E-commerce Seller", text: "98% approval rate is real. I was rejected everywhere else but MyCoinCard Cash saw my potential. Game changer.", rating: 5 },
  { name: "Priya N.", role: "Medical Professional", text: "Transparent rates, no hidden fees, fast disbursement. This is how lending should work in 2024.", rating: 5 },
  { name: "Carlos V.", role: "Real Estate Agent", text: "The wallet connect feature plus traditional banking. Best of both worlds for someone like me who operates in crypto.", rating: 5 },
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Trusted by Thousands</h2>
          <p className="text-text-soft mt-3 max-w-md mx-auto">
            Real stories from real borrowers who transformed their finances.
          </p>
        </motion.div>
      </div>

      {/* Scrolling testimonial cards */}
      <div className="relative">
        <div className="flex gap-5 overflow-x-auto pb-4 px-4 sm:px-6 snap-x scroll-smooth no-scrollbar">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass p-6 min-w-[300px] sm:min-w-[340px] snap-center shrink-0 hover:border-gold/20 transition-all"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm text-text-soft leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
              <div>
                <div className="font-display font-bold text-sm text-text">{r.name}</div>
                <div className="text-xs text-muted">{r.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-bg to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-bg to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
