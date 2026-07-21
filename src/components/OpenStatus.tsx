"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

// Pill "● Abierto / Cerrado" del header (estilo Sote), calculado con la hora
// de Argentina (UTC-3) y los rangos de site.openingHours. Renderiza recién al
// montar para evitar mismatch de hidratación.

function isOpenNow(): boolean {
  const now = new Date();
  // Hora argentina sin depender del timezone del visitante.
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ar = new Date(utc - 3 * 3600000);
  const ranges = site.openingHours[ar.getDay()] ?? [];
  const h = ar.getHours() + ar.getMinutes() / 60;
  return ranges.some(([from, to]) => h >= from && h < to);
}

export function OpenStatus() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setOpen(isOpenNow());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  if (open === null) return null;

  return (
    <span
      title={site.contact.hours}
      className="hidden items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted lg:inline-flex"
    >
      <span
        className={`h-2 w-2 rounded-full ${open ? "bg-emerald-400" : "bg-red-400/80"}`}
      />
      {open ? "Abierto" : "Cerrado"}
    </span>
  );
}
