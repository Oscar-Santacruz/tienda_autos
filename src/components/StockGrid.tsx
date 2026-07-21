"use client";

import { useState } from "react";
import type { Car } from "@/lib/types";
import { site } from "@/lib/site";
import { CarCard } from "./CarCard";

// Grid del stock con paginación "Cargar más" (estilo Sote) + CTA a Instagram.
// El componente se re-monta al cambiar los filtros (key en StockSection),
// reseteando la cantidad visible.

const PAGE = 9;

export function StockGrid({ cars }: { cars: Car[] }) {
  const [count, setCount] = useState(PAGE);
  const visible = cars.slice(0, count);

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((car, i) => (
          <CarCard key={car.id} car={car} index={i} />
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        {count < cars.length && (
          <button
            type="button"
            onClick={() => setCount((c) => c + PAGE)}
            className="rounded-full border border-border px-7 py-3.5 text-sm font-bold uppercase tracking-[0.15em] transition-colors hover:border-accent hover:text-accent"
          >
            + Cargar más autos
          </button>
        )}
        <a
          href={site.contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-black shadow-[0_10px_30px_-10px_rgba(212,175,55,0.7)] transition-colors hover:bg-accent-hover"
        >
          Ver en Instagram
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
            <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" />
          </svg>
        </a>
      </div>
    </>
  );
}
