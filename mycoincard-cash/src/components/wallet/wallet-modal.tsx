"use client";
import { Fragment } from "react";
import { X, ExternalLink } from "lucide-react";

const WALLETS = [
  { name: "MetaMask", icon: "/wallets/metamask.svg", color: "#F6851B", url: "https://metamask.io" },
  { name: "WalletConnect", icon: "/wallets/walletconnect.svg", color: "#3B99FC", url: "https://walletconnect.com" },
  { name: "Coinbase Wallet", icon: "/wallets/coinbase.svg", color: "#0052FF", url: "https://www.coinbase.com/wallet" },
  { name: "Trust Wallet", icon: "/wallets/trust.svg", color: "#3375BB", url: "https://trustwallet.com" },
  { name: "Phantom", icon: "/wallets/phantom.svg", color: "#AB9FF2", url: "https://phantom.app" },
  { name: "Rainbow", icon: "/wallets/rainbow.svg", color: "#001E59", url: "https://rainbow.me" },
  { name: "Ledger", icon: "/wallets/ledger.svg", color: "#000000", url: "https://www.ledger.com" },
  { name: "Binance Wallet", icon: "/wallets/binance.svg", color: "#F0B90B", url: "https://www.binance.com" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function WalletModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md animate-fade-up">
        <div className="bg-white/[0.04] backdrop-blur-3xl border border-white/[0.10] rounded-3xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
            <div>
              <h2 className="font-display font-bold text-lg text-text">Connect Wallet</h2>
              <p className="text-xs text-muted mt-0.5">Choose your preferred wallet to connect</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/[0.06] text-muted hover:text-text transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wallet grid */}
          <div className="p-5 grid grid-cols-2 gap-3">
            {WALLETS.map((w) => (
              <button
                key={w.name}
                className="group relative flex flex-col items-center gap-3 p-4 rounded-2xl
                           bg-white/[0.03] border border-white/[0.06]
                           hover:bg-white/[0.07] hover:border-gold/30
                           transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => {
                  // In production, this triggers the wallet SDK connection
                  alert(`Connecting to ${w.name}...`);
                  onClose();
                }}
              >
                {/* Wallet icon placeholder (colored circle with initial) */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm
                             shadow-lg group-hover:shadow-gold/20 transition-shadow"
                  style={{ background: `linear-gradient(135deg, ${w.color}cc, ${w.color})` }}
                >
                  {w.name.charAt(0)}
                </div>
                <span className="text-xs font-medium text-text-soft group-hover:text-text transition text-center leading-tight">
                  {w.name}
                </span>
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 30%, ${w.color}15, transparent 70%)`,
                  }}
                />
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-between">
            <p className="text-[11px] text-muted">
              By connecting, you agree to our{" "}
              <a href="/terms" className="text-gold hover:underline">Terms</a>
            </p>
            <a
              href="https://ethereum.org/wallets"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-gold hover:underline flex items-center gap-1"
            >
              What is a wallet? <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
