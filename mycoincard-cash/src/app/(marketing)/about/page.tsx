"use client";
import { motion } from "framer-motion";
import { Shield, Users, Globe, TrendingUp, Award, Heart } from "lucide-react";

const VALUES = [
  { icon: Shield, title: "Security First", desc: "Bank-level encryption and compliance standards protect every transaction." },
  { icon: Users, title: "Customer Centric", desc: "Every feature is designed around what borrowers actually need." },
  { icon: Globe, title: "Global Access", desc: "Available in 30+ countries with multi-currency support." },
  { icon: TrendingUp, title: "Transparent Rates", desc: "No hidden fees. What you see is exactly what you pay." },
  { icon: Award, title: "Licensed & Regulated", desc: "Fully compliant with financial regulations in every market we serve." },
  { icon: Heart, title: "Community Driven", desc: "Referral rewards and financial education for our borrower community." },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="badge-gold mb-4 inline-flex">About Us</span>
          <h1 className="section-title text-4xl sm:text-5xl">Building the Future of <span className="gold-text">Digital Lending</span></h1>
          <p className="text-text-soft mt-4 max-w-2xl mx-auto text-lg">
            MyCoinCard Cash was founded with a simple mission: make competitive funding accessible to everyone, everywhere, without the red tape of traditional banks.
          </p>
        </motion.div>

        {/* Story */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-strong p-8 sm:p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display font-bold text-2xl text-text mb-4">Our Story</h2>
              <p className="text-text-soft leading-relaxed mb-4">
                Founded in 2022, MyCoinCard Cash started as a response to the frustrating loan application processes that left millions underserved. We believed that with the right technology, getting funded should be as simple as ordering a ride.
              </p>
              <p className="text-text-soft leading-relaxed">
                Today we serve over 12,000 active users across 30+ countries, with more than $50 million funded. Our platform combines traditional lending with Web3 wallet integration, offering the best of both worlds.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-soft p-5 text-center">
                <div className="text-3xl font-display font-bold gold-text">2022</div>
                <div className="text-xs text-muted mt-1">Founded</div>
              </div>
              <div className="glass-soft p-5 text-center">
                <div className="text-3xl font-display font-bold text-text">50+</div>
                <div className="text-xs text-muted mt-1">Team Members</div>
              </div>
              <div className="glass-soft p-5 text-center">
                <div className="text-3xl font-display font-bold text-success">30+</div>
                <div className="text-xs text-muted mt-1">Countries</div>
              </div>
              <div className="glass-soft p-5 text-center">
                <div className="text-3xl font-display font-bold text-info">$50M+</div>
                <div className="text-xs text-muted mt-1">Funded</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="section-title text-3xl">Our Values</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass p-6 hover:border-gold/30 transition-all">
              <div className="w-11 h-11 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4">
                <v.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-text mb-2">{v.title}</h3>
              <p className="text-sm text-text-soft">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
