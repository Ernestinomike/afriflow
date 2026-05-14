import Link from "next/link";

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group">
      <span
        className="relative inline-flex items-center justify-center rounded-xl"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 40 40" width={size} height={size} className="drop-shadow-[0_0_18px_rgba(244,167,0,0.45)]">
          <defs>
            <linearGradient id="mcc-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F4A700" />
              <stop offset="1" stopColor="#FFD166" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="36" height="36" rx="11" fill="url(#mcc-g)" />
          <path d="M11 27 L11 13 L20 23 L29 13 L29 27" stroke="#06070E" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="32" cy="29" r="2" fill="#06070E" />
        </svg>
      </span>
      <span className="font-display font-extrabold tracking-tight text-lg leading-none">
        <span className="text-text">MyCoinCard</span> <span className="gold-text">Cash</span>
      </span>
    </Link>
  );
}
