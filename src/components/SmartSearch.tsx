"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// Buscador "Buscá como hablás" (réplica de Sote): interpreta lenguaje natural
// ("SUV diésel automática hasta 40 millones") y lo convierte en filtros de la
// URL. Sin backend: parser de palabras clave en el cliente.

const USD_TO_ARS = 1300; // mantener en sync con src/lib/format.ts

const SUGERENCIAS = [
  "Pick-up 4x4 diésel",
  "Automática hasta 40 millones",
  "SUV 0km nafta",
];

function parse(q: string): URLSearchParams {
  const params = new URLSearchParams();
  let s = q
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const has = (re: RegExp) => {
    const found = re.test(s);
    if (found) s = s.replace(re, " ");
    return found;
  };

  // Categoría
  if (has(/\b(suv|todo terreno)\b/)) params.set("category", "SUV");
  else if (has(/\bsedan\b/)) params.set("category", "Sedán");
  else if (has(/\b(pick[\s-]?up|camioneta)\b/)) params.set("category", "Pick-up");
  else if (has(/\bhatch(back)?\b/)) params.set("category", "Hatchback");
  else if (has(/\b(utilitario|furgon)\b/)) params.set("category", "Utilitario");
  else if (has(/\bcamion\b/)) params.set("category", "Camión");
  else if (has(/\bmotos?\b/)) params.set("category", "Moto");
  else if (has(/\b(nautica|jet\s?ski|moto de agua)\b/)) params.set("category", "Náutica");

  // Combustible
  if (has(/\bdiesel\b/)) params.set("fuel", "Diésel");
  else if (has(/\bnafta\b/)) params.set("fuel", "Nafta");
  else if (has(/\bhibrid[oa]\b/)) params.set("fuel", "Híbrido");
  else if (has(/\belectric[oa]\b/)) params.set("fuel", "Eléctrico");

  // Transmisión
  if (has(/\bautomatic[oa]\b/) || has(/\b(at|cvt)\b/))
    params.set("transmission", "Automático");
  else if (has(/\bmanual\b/) || has(/\bmt\b/))
    params.set("transmission", "Manual");

  // 0km / poco uso
  if (has(/\b0\s?km\b/)) params.set("maxKm", "0");
  else if (has(/\bpoco uso\b/)) params.set("maxKm", "50000");

  // Precio: "hasta 40 millones", "hasta usd 25.000", "hasta $30.000.000",
  // "hasta 40 mil dolares"
  const mPrecio = s.match(
    /hasta\s+(?:usd\s*|u\$s\s*|\$\s*)?([\d.,]+)\s*(mil(?:lones)?)?\s*(dolares|usd)?/,
  );
  if (mPrecio) {
    let n = parseFloat(mPrecio[1].replace(/\./g, "").replace(",", "."));
    if (!Number.isNaN(n) && n > 0) {
      const escala = mPrecio[2];
      if (escala === "millones" || escala === "millon") n *= 1_000_000;
      else if (escala === "mil") n *= 1_000;
      const esUsd = !!mPrecio[3] || /usd|u\$s|dolar/.test(mPrecio[0]);
      if (esUsd) n *= USD_TO_ARS;
      // Heurística: números chicos sin escala en un contexto de autos son
      // millones de pesos ("hasta 40" → 40.000.000).
      if (!escala && !esUsd && n < 1000) n *= 1_000_000;
      params.set("maxPrice", String(Math.round(n)));
      s = s.replace(mPrecio[0], " ");
    }
  }

  // Lo que queda (marca/modelo) va a la búsqueda de texto.
  const resto = s.replace(/\b(4x4|4x2|auto|autos?|hasta|una?|con)\b/g, " ").trim();
  if (resto.length > 2) params.set("query", resto);

  return params;
}

export function SmartSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const buscar = (texto: string) => {
    const params = parse(texto);
    router.replace(`/?${params.toString()}#stock`, { scroll: false });
  };

  return (
    <div data-reveal className="mx-auto mt-8 max-w-3xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          buscar(q);
        }}
        className="flex items-center gap-2 rounded-full border border-accent/40 bg-surface/90 p-2 pl-5 backdrop-blur"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-accent" aria-hidden>
          <path d="m20.71 5.63-2.34-2.34a1 1 0 0 0-1.41 0l-3.12 3.12-1.93-1.91-1.41 1.41 1.42 1.42L3 16.25V21h4.75l9.92-9.92 1.42 1.42 1.41-1.41-1.92-1.92 3.13-3.13a1 1 0 0 0 0-1.41z" />
        </svg>
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder='Buscá como hablás: "SUV diésel automática hasta 40 millones"'
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted/80 focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-black transition-colors hover:bg-accent-hover"
        >
          Buscar
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
            <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
          </svg>
        </button>
      </form>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-muted">
        Probá:
        {SUGERENCIAS.map((sug) => (
          <button
            key={sug}
            type="button"
            onClick={() => {
              setQ(sug);
              buscar(sug);
            }}
            className="rounded-full border border-border px-3 py-1.5 transition-colors hover:border-accent hover:text-accent"
          >
            {sug}
          </button>
        ))}
      </div>
    </div>
  );
}
