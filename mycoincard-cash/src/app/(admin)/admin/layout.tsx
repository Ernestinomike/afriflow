"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { useTheme } from "@/components/theme-provider";
import {
  LayoutDashboard, Users, FileText, Shield, BarChart3,
  Mail, MessageSquare, AlertTriangle, Activity, Settings,
  LogOut, Menu, X, Sun, Moon, Bell, DollarSign
} from "lucide-react";

const ADMIN_NAV = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Loan Applications", href: "/admin/loans", icon: FileText },
  { label: "KYC Reviews", href: "/admin/kyc", icon: Shield },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Revenue", href: "/admin/revenue", icon: DollarSign },
  { label: "Support Tickets", href: "/admin/tickets", icon: MessageSquare },
  { label: "Broadcasts", href: "/admin/broadcasts", icon: Mail },
  { label: "Fraud Monitor", href: "/admin/fraud", icon: AlertTriangle },
  { label: "Activity Logs", href: "/admin/logs", icon: Activity },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-bg-soft/90 backdrop-blur-2xl border-r border-white/[0.06] transform transition-transform lg:translate-x-0 lg:static lg:z-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo size={24} />
              <span className="text-[10px] bg-danger/10 text-danger border border-danger/20 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">Admin</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted hover:text-text">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
            {ADMIN_NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                    active ? "bg-gold/10 text-gold border border-gold/20" : "text-text-soft hover:text-text hover:bg-white/[0.04]"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-white/[0.06] space-y-1">
            <button onClick={toggle} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] text-text-soft hover:text-text hover:bg-white/[0.04] w-full transition">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
            <Link href="/" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] text-danger hover:bg-danger/10 w-full transition">
              <LogOut className="w-4 h-4" /> Sign Out
            </Link>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-bg/70 backdrop-blur-xl border-b border-white/[0.06] px-4 sm:px-6 h-14 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-muted hover:text-text">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-muted hover:text-text transition">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger" />
            </button>
            <div className="w-8 h-8 rounded-full bg-danger/20 flex items-center justify-center text-danger text-xs font-bold">A</div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
