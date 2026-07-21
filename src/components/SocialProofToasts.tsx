"use client";

import { useEffect, useState } from "react";

// Toasts de actividad abajo a la izquierda (estilo Sote): "Alguien está
// viendo …", "Alguien consultó por …". Rotan al azar sobre el stock real.
// Solo client-side (SSR renderiza null), sin backend.

export function SocialProofToasts({ items }: { items: string[] }) {
  const [msg, setMsg] = useState<{ title: string; meta: string } | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (hidden || items.length === 0) return;
    let t: ReturnType<typeof setTimeout>;

    const cycle = () => {
      const roll = Math.random();
      const car = items[Math.floor(Math.random() * items.length)];
      const title =
        roll < 0.65
          ? `Alguien está viendo ${car}`
          : roll < 0.85
            ? `Alguien consultó por ${car}`
            : "Alguien pidió una tasación";
      const hrs = 1 + Math.floor(Math.random() * 9);
      setMsg({ title, meta: `hace ${hrs} h` });
      t = setTimeout(() => {
        setMsg(null);
        t = setTimeout(cycle, 8000 + Math.random() * 7000);
      }, 5200);
    };

    t = setTimeout(cycle, 7000);
    return () => clearTimeout(t);
  }, [items, hidden]);

  if (hidden || !msg) return null;

  return (
    <div className="toast-in fixed bottom-5 left-5 z-40 flex max-w-[280px] items-start gap-3 rounded-2xl border border-border bg-surface/95 p-4 shadow-xl backdrop-blur">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-accent" aria-hidden>
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
        </svg>
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-snug">{msg.title}</p>
        <p className="mt-0.5 text-xs text-muted">{msg.meta}</p>
      </div>
      <button
        type="button"
        aria-label="Cerrar"
        onClick={() => setHidden(true)}
        className="ml-1 text-muted transition-colors hover:text-foreground"
      >
        ✕
      </button>
    </div>
  );
}
