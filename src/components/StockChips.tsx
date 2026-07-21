"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { CATEGORIES } from "@/lib/constants";

// Chips de categoría y de marca con contador (réplica de Sote). Escriben los
// mismos parámetros de URL que los selects de StockFilters.

export function StockChips({
  brandCounts,
  categoryCounts,
}: {
  brandCounts: [string, number][];
  categoryCounts: Record<string, number>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && params.get(key) !== value) params.set(key, value);
      else params.delete(key);
      router.replace(`/?${params.toString()}#stock`, { scroll: false });
    },
    [router, searchParams],
  );

  const activeCat = searchParams.get("category") ?? "";
  const activeBrand = searchParams.get("brand") ?? "";

  const base =
    "rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors";

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setParam("category", "")}
          className={`${base} ${
            activeCat === ""
              ? "border-accent bg-accent text-black"
              : "border-border text-muted hover:border-accent hover:text-accent"
          }`}
        >
          Todos
        </button>
        {CATEGORIES.filter((c) => (categoryCounts[c] ?? 0) > 0).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setParam("category", c)}
            className={`${base} ${
              activeCat === c
                ? "border-accent bg-accent text-black"
                : "border-border text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {brandCounts.map(([brand, n]) => (
          <button
            key={brand}
            type="button"
            onClick={() => setParam("brand", brand)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              activeBrand === brand
                ? "border-accent bg-accent text-black"
                : "border-border text-foreground/90 hover:border-accent hover:text-accent"
            }`}
          >
            {brand} <span className="opacity-60">{n}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
