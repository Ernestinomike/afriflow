import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Shield, Lock, Award, Globe } from "lucide-react";

const LINKS = {
  Product: [
    { label: "Personal Loans", href: "/apply" },
    { label: "Business Loans", href: "/apply" },
    { label: "Calculator", href: "/#calculator" },
    { label: "Eligibility", href: "/#eligibility" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/about" },
    { label: "Press", href: "/about" },
  ],
  Support: [
    { label: "Help Center", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Security", href: "/about" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-24">
      {/* Trust badges row */}
      <div className="border-b border-white/[0.04] bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-muted text-xs">
          <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-gold" /> 256-Bit SSL Encryption</span>
          <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-gold" /> PCI DSS Compliant</span>
          <span className="flex items-center gap-2"><Award className="w-4 h-4 text-gold" /> Licensed & Regulated</span>
          <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-gold" /> Available in 30+ Countries</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Logo size={28} />
            <p className="mt-4 text-sm text-text-soft leading-relaxed max-w-xs">
              Premium loan marketplace connecting borrowers with competitive funding. Fast approvals, secure process, transparent terms.
            </p>
            <p className="mt-6 text-xs text-muted">
              &copy; {new Date().getFullYear()} MyCoinCard Cash. All rights reserved.
            </p>
          </div>

          {/* Link sections */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-bold text-sm text-text mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-text-soft hover:text-gold transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <span>mycoincard.cash &middot; Powered by advanced fintech infrastructure</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gold transition">Privacy</Link>
            <Link href="/terms" className="hover:text-gold transition">Terms</Link>
            <Link href="/contact" className="hover:text-gold transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
