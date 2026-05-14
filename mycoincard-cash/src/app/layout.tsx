import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mycoincard.cash"),
  title: {
    default: "MyCoinCard Cash — Premium fintech loans, made simple",
    template: "%s · MyCoinCard Cash"
  },
  description:
    "MyCoinCard Cash is a premium loan marketplace and account management platform. Apply for funding, verify securely, and track your applications in real time.",
  keywords: ["loan marketplace", "fintech", "personal loans", "business loans", "online lending", "crypto wallet"],
  openGraph: {
    type: "website",
    title: "MyCoinCard Cash",
    description: "Premium loan marketplace and account management platform.",
    url: "https://mycoincard.cash",
    siteName: "MyCoinCard Cash"
  },
  twitter: { card: "summary_large_image", title: "MyCoinCard Cash" },
  icons: { icon: "/favicon.svg" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans antialiased min-h-screen">
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
