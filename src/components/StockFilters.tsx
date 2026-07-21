"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const CATEGORIES = ["SUV", "Sedán", "Pick-up", "Hatchback", "Deportivo", "Clásico"];
const KM_OPTIONS = [
  { label: "Hasta 20.000 km", value: "20000" },
  { label: "Hasta 50.000 km", value: "50000" },
  { label: "Hasta 100.000 km", value: "100000" },
  { label: "Hasta 150.000 km", value: "150000" },
];
const PRICE_OPTIONS = [
  { label: "Hasta USD 25.000", value: "25000" },
  { label: "Hasta USD 50.000", value: "50000" },
  { label: "Hasta USD 100.000", value: "100000" },
  { label: "Hasta USD 200.000", value: "200000" },
];
const SORT_OPTIONS = [
  { label: "Más recientes", value: "recientes" },
  { label: "Menor precio", value: "precio_asc" },
  { label: "Mayor precio", value: "precio_desc" },
  { label: "Menos kilómetros", value: "km_asc" },
];

const selectClass =
  "w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none";

export function StockFilters() {
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

  const val = (k: string) => searchParams.get(k) ?? "";

  return (
    <div className="grid grid-cols-1 gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-2 lg:grid-cols-5">
      <input
        type="search"
        placeholder="Buscar marca o modelo…"
        defaultValue={val("query")}
        onChange={(e) => update("query", e.target.value)}
        className={selectClass}
      />

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
        value={val("sort")}
        onChange={(e) => update("sort", e.target.value)}
        className={`${selectClass} sm:col-span-2 lg:col-span-1`}
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
