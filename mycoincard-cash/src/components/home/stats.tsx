"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedCounter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.max(1, Math.floor(end / 60));
    const interval = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(interval); return; }
      setCount(start);
    }, 25);
    return () => clearInterval(interval);
  }, [inView, end]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const STATS = [
  { value: 50, prefix: "$", suffix: "M+", label: "Total Funded", color: "gold-text" },
  { value: 12500, suffix: "+", label: "Active Users", color: "text-text" },
  { value: 98, suffix: "%", label: "Approval Rate", color: "text-success" },
  { value: 24, suffix: "h", label: "Avg. Disbursement", color: "text-info" },
];

export function Stats() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="stat-tile text-center"
            >
              <div className={`text-3xl sm:text-4xl font-display font-extrabold ${s.color}`}>
                <AnimatedCounter end={s.value} prefix={s.prefix || ""} suffix={s.suffix || ""} />
              </div>
              <div className="text-sm text-muted mt-2">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
