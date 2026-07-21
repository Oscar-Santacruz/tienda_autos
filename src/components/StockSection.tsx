import { Suspense } from "react";
import type { Car } from "@/lib/types";
import { StockFilters } from "./StockFilters";
import { StockChips } from "./StockChips";
import { SmartSearch } from "./SmartSearch";
import { StockGrid } from "./StockGrid";
import { AvisameCard } from "./AvisameCard";

// Sección de stock (réplica del layout de Sote): título display + sub serif,
// chips de categoría/marca, buscador natural, filtros clásicos, contador
// "Mostrando X de Y", strip "Productos calientes" y grid con "Cargar más".

export function StockSection({
  cars,
  allCars,
  brands,
}: {
  cars: Car[];
  allCars: Car[];
  brands: string[];
}) {
  const brandCounts: [string, number][] = brands
    .map((b): [string, number] => [
      b,
      allCars.filter((c) => c.brand === b).length,
    ])
    .sort((a, b) => b[1] - a[1]);

  const categoryCounts: Record<string, number> = {};
  for (const c of allCars) {
    categoryCounts[c.category] = (categoryCounts[c.category] ?? 0) + 1;
  }

  const gridKey = `${cars.length}-${cars[0]?.id ?? "none"}`;

  return (
    <section id="stock" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <span data-reveal className="section-pill">
            Stock real · Actualizado
          </span>
          <h2 data-reveal className="h-display mt-6 text-4xl sm:text-6xl">
            Nuestro stock,{" "}
            <span className="accent-serif text-5xl sm:text-7xl">
              uno por uno
            </span>
          </h2>
          <p
            data-reveal
            className="mx-auto mt-5 max-w-2xl font-serif italic text-lg text-muted"
          >
            Solo unidades revisadas, publicadas con información real y listas
            para entregar.
          </p>
        </div>

        <div className="mt-10" data-reveal>
          <Suspense fallback={<div className="h-24" />}>
            <StockChips
              brandCounts={brandCounts}
              categoryCounts={categoryCounts}
            />
          </Suspense>
        </div>

        <SmartSearch />

        <div className="mt-8" data-reveal>
          <Suspense
            fallback={
              <div className="h-24 rounded-2xl border border-border bg-surface" />
            }
          >
            <StockFilters
              brands={brands}
              shown={cars.length}
              total={allCars.length}
            />
          </Suspense>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.25em] text-foreground">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-accent"
              aria-hidden
            >
              <path d="M13.5 0.67s0.74 2.65 0.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l0.03-0.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5 0.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-0.36 3.6-1.21 4.62-2.58 0.39 1.29 0.59 2.65 0.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
            </svg>
            Productos calientes
          </p>
          <a
            href="#stock"
            className="text-xs font-bold uppercase tracking-[0.25em] text-muted transition-colors hover:text-accent"
          >
            Ver todo el stock ↓
          </a>
        </div>

        {cars.length === 0 ? (
          <p className="mt-12 text-center text-muted">
            No encontramos unidades con esos filtros. Probá ajustando la
            búsqueda.
          </p>
        ) : (
          <StockGrid key={gridKey} cars={cars} />
        )}

        <AvisameCard />
      </div>
    </section>
  );
}
