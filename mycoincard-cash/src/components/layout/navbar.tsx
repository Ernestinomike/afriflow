"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Wallet, Moon, Sun, ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useTheme } from "@/components/theme-provider";
import { WalletModal } from "@/components/wallet/wallet-modal";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Apply", href: "/apply" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] border-b border-white/[0.06]">
        {/* Frosted glass navbar */}
        <div className="bg-bg/60 backdrop-blur-2xl">
          <nav className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 h-16">
            {/* Logo */}
            <Logo size={30} />

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="nav-link">{l.label}</Link>
                </li>
              ))}
            </ul>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <button onClick={toggle} className="p-2 rounded-lg hover:bg-white/[0.06] transition text-muted hover:text-gold">
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Wallet connect */}
              <button onClick={() => setWalletOpen(true)} className="btn-ghost text-xs sm:text-sm !py-2 !px-3 sm:!px-4">
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">Connect Wallet</span>
              </button>

              {/* Sign In */}
              <Link href="/login" className="btn-gold text-xs sm:text-sm !py-2 !px-4">
                Sign In
              </Link>

              {/* Mobile burger */}
              <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-text-soft hover:text-gold">
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden border-t border-white/[0.06] bg-bg/80 backdrop-blur-2xl animate-fade-up">
              <ul className="flex flex-col gap-1 p-4">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-xl text-text-soft hover:text-gold hover:bg-white/[0.04] transition"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => { setMobileOpen(false); setWalletOpen(true); }}
                    className="w-full text-left px-4 py-3 rounded-xl text-text-soft hover:text-gold hover:bg-white/[0.04] transition flex items-center gap-2"
                  >
                    <Wallet className="w-4 h-4" /> Connect Wallet
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      <WalletModal open={walletOpen} onClose={() => setWalletOpen(false)} />
    </>
  );
}
