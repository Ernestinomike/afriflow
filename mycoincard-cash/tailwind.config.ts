import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#06070E", soft: "#0B0D17", surface: "#10121F", card: "#141728" },
        border: { DEFAULT: "#1E2236", soft: "#171A2C" },
        gold: {
          DEFAULT: "#F4A700",
          light: "#FFD166",
          dark: "#B47B00",
          glow: "#F4A70033"
        },
        success: "#00C896",
        danger: "#FF4D6D",
        info: "#4C8EF7",
        muted: "#6B7193",
        text: { DEFAULT: "#EDF0FF", soft: "#B8BDD9" }
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"]
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(244,167,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,167,0,0.06) 1px, transparent 1px)",
        "gold-gradient": "linear-gradient(135deg,#F4A700 0%,#FFD166 50%,#F4A700 100%)",
        "radial-gold": "radial-gradient(circle at 50% 0%, rgba(244,167,0,0.18), transparent 60%)"
      },
      boxShadow: {
        gold: "0 8px 32px -8px rgba(244,167,0,0.45)",
        glass: "0 8px 32px 0 rgba(0,0,0,0.45)",
        "inset-glow": "inset 0 1px 0 0 rgba(255,255,255,0.06)"
      },
      animation: {
        "fade-up": "fadeUp .55s cubic-bezier(.22,1,.36,1) both",
        "fade-in": "fadeIn .4s ease both",
        shimmer: "shimmer 2.4s linear infinite",
        glow: "glow 2.6s ease-in-out infinite",
        "ticker": "ticker 40s linear infinite"
      },
      keyframes: {
        fadeUp: { from: { opacity: "0", transform: "translateY(18px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        shimmer: { from: { backgroundPosition: "-200% 0" }, to: { backgroundPosition: "200% 0" } },
        glow: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(244,167,0,0.35)" },
          "50%": { boxShadow: "0 0 0 14px rgba(244,167,0,0)" }
        },
        ticker: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } }
      }
    }
  },
  plugins: []
};
export default config;
