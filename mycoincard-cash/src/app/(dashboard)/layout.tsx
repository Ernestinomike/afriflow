"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { useTheme } from "@/components/theme-provider";
import {
  LayoutDashboard, FileText, Upload, Bell, MessageSquare,
  Settings, LogOut, Menu, X, Sun, Moon, Wallet, User, CreditCard,
  Shield, HelpCircle
} from "lucide-react";

const USER_NAV = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Applications", href: "/dashboard/loans", icon: FileText },
  { label: "Documents", href: "/dashboard/documents", icon: Upload },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Support", href: "/dashboard/support", icon: MessageSquare },
  { label: "KYC Verification", href: "/dashboard/kyc", icon: Shield },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-bg-soft/90 backdrop-blur-2xl border-r border-white/[0.06] transform transition-transform lg:translate-x-0 lg:static lg:z-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
            <Logo size={26} />
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted hover:text-text">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {USER_NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-gold/10 text-gold border border-gold/20"
                      : "text-text-soft hover:text-text hover:bg-white/[0.04]"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="p-3 border-t border-white/[0.06] space-y-1">
            <button onClick={toggle} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-text-soft hover:text-text hover:bg-white/[0.04] w-full transition">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
            <Link href="/api/auth/logout" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-danger hover:bg-danger/10 w-full transition">
              <LogOut className="w-4 h-4" /> Sign Out
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-bg/70 backdrop-blur-xl border-b border-white/[0.06] px-4 sm:px-6 h-14 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-muted hover:text-text">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <Link href="/dashboard/notifications" className="relative p-2 text-muted hover:text-text transition">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gold" />
          </Link>
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs font-bold">
            D
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
