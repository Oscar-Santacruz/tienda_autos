import { Suspense } from "react";
import type { Car } from "@/lib/types";
import { CarCard } from "./CarCard";
import { StockFilters } from "./StockFilters";

export function StockSection({
  cars,
  brands,
}: {
  cars: Car[];
  brands: string[];
}) {
  return (
    <section id="stock" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div data-reveal>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Nuestro stock
            </h2>
            <p className="mt-2 text-muted">
              {cars.length} {cars.length === 1 ? "unidad" : "unidades"}{" "}
              disponibles
            </p>
          </div>
        </div>

        <div className="mt-8" data-reveal>
          <Suspense
            fallback={
              <div className="h-24 rounded-2xl border border-border bg-surface" />
            }
          >
            <StockFilters brands={brands} />
          </Suspense>
        </div>

        {cars.length === 0 ? (
          <p className="mt-12 text-center text-muted">
            No encontramos unidades con esos filtros. Probá ajustando la
            búsqueda.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
