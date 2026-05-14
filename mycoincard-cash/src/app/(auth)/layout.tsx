import { Logo } from "@/components/ui/logo";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-radial-gold opacity-40 pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Logo size={36} />
        </div>
        {children}
        <p className="text-center text-xs text-muted mt-6">
          <Link href="/" className="hover:text-gold transition">Back to Home</Link>
          {" · "}
          <Link href="/privacy" className="hover:text-gold transition">Privacy</Link>
          {" · "}
          <Link href="/terms" className="hover:text-gold transition">Terms</Link>
        </p>
      </div>
    </div>
  );
}
