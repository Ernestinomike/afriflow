"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";
type Toast = { id: number; type: ToastType; title: string; body?: string };

const Ctx = createContext<{ push: (t: Omit<Toast, "id">) => void }>({ push: () => {} });
export const useToast = () => useContext(Ctx);

let _push: ((t: Omit<Toast, "id">) => void) | null = null;
export function toast(t: Omit<Toast, "id">) { _push?.(t); }

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, ...t }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4500);
  }, []);

  useEffect(() => { _push = push; return () => { _push = null; }; }, [push]);

  return (
    <Ctx.Provider value={{ push }}>
      <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => {
          const Icon = t.type === "success" ? CheckCircle2 : t.type === "error" ? AlertCircle : Info;
          const tone =
            t.type === "success" ? "text-success border-success/30"
            : t.type === "error" ? "text-danger border-danger/30"
            : "text-gold border-gold/30";
          return (
            <div key={t.id} className={`glass-strong px-4 py-3 min-w-[280px] max-w-sm pointer-events-auto animate-fade-up ${tone}`}>
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-display font-semibold text-sm text-text">{t.title}</div>
                  {t.body && <div className="text-xs text-text-soft mt-0.5">{t.body}</div>}
                </div>
                <button onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))} className="text-muted hover:text-text">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Ctx.Provider>
  );
}
