"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const CATEGORIES = [
  "SUV",
  "Sedán",
  "Pick-up",
  "Hatchback",
  "Utilitario",
  "Camión",
  "Moto",
  "Náutica",
];
const FUELS = ["Nafta", "Diésel", "Híbrido", "Eléctrico"];
const KM_OPTIONS = [
  { label: "0 km", value: "0" },
  { label: "Hasta 20.000 km", value: "20000" },
  { label: "Hasta 50.000 km", value: "50000" },
  { label: "Hasta 100.000 km", value: "100000" },
  { label: "Hasta 150.000 km", value: "150000" },
];
// Rangos en pesos (las unidades en USD se comparan por su equivalente).
const PRICE_OPTIONS = [
  { label: "Hasta $15.000.000", value: "15000000" },
  { label: "Hasta $25.000.000", value: "25000000" },
  { label: "Hasta $40.000.000", value: "40000000" },
  { label: "Hasta $60.000.000", value: "60000000" },
  { label: "Hasta $90.000.000", value: "90000000" },
];
const SORT_OPTIONS = [
  { label: "Más recientes", value: "recientes" },
  { label: "Menor precio", value: "precio_asc" },
  { label: "Mayor precio", value: "precio_desc" },
  { label: "Menos kilómetros", value: "km_asc" },
];

const selectClass =
  "w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none";

export function StockFilters({
  brands,
  shown,
  total,
}: {
  brands: string[];
  shown: number;
  total: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      router.replace(`/?${params.toString()}#stock`, { scroll: false });
    },
    [router, searchParams],
  );

  const clearAll = useCallback(() => {
    router.replace("/#stock", { scroll: false });
  }, [router]);

  const val = (k: string) => searchParams.get(k) ?? "";
  const hasFilters = Array.from(searchParams.keys()).some(
    (k) => k !== "sort" && (searchParams.get(k) ?? "") !== "",
  );

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input
          type="search"
          placeholder="Buscar marca o modelo…"
          defaultValue={val("query")}
          onChange={(e) => update("query", e.target.value)}
          className={`${selectClass} sm:col-span-2 lg:col-span-4`}
        />

        <select
          value={val("brand")}
          onChange={(e) => update("brand", e.target.value)}
          className={selectClass}
        >
          <option value="">Marca</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          value={val("category")}
          onChange={(e) => update("category", e.target.value)}
          className={selectClass}
        >
          <option value="">Categoría</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={val("fuel")}
          onChange={(e) => update("fuel", e.target.value)}
          className={selectClass}
        >
          <option value="">Combustible</option>
          {FUELS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>

        <select
          value={val("transmission")}
          onChange={(e) => update("transmission", e.target.value)}
          className={selectClass}
        >
          <option value="">Transmisión</option>
          <option value="Automático">Automático</option>
          <option value="Manual">Manual</option>
        </select>

        <select
          value={val("maxKm")}
          onChange={(e) => update("maxKm", e.target.value)}
          className={selectClass}
        >
          <option value="">Kilómetros</option>
          {KM_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <select
          value={val("maxPrice")}
          onChange={(e) => update("maxPrice", e.target.value)}
          className={selectClass}
        >
          <option value="">Precio</option>
          {PRICE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <select
          value={val("sort") || "recientes"}
          onChange={(e) => update("sort", e.target.value)}
          className={selectClass}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">
          Mostrando <span className="font-bold text-foreground">{shown}</span>{" "}
          de {total} totales
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="rounded-full border border-accent/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-black"
          >
            ↺ Limpiar
          </button>
        )}
      </div>
    </div>
  );
}
