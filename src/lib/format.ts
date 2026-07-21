import type { Currency } from "./types";

// Cotización aproximada USD→ARS. Se usa SOLO para poder ordenar y filtrar por
// precio un stock que mezcla ambas monedas; el precio se muestra siempre en su
// moneda real. Ajustar acá si cambia la referencia (y en supabase/migrations
// si se usa la columna generada price_ars).
export const USD_TO_ARS = 1300;

/** Precio normalizado a pesos, para ordenar/filtrar mezclando monedas. */
export function priceInArs(
  price: number | null,
  currency: Currency,
): number | null {
  if (price == null) return null;
  return currency === "USD" ? price * USD_TO_ARS : price;
}

/** Muestra el precio en su moneda real. `null` → "Consultar". */
export function formatPrice(price: number | null, currency: Currency): string {
  if (price == null) return "Consultar";
  if (currency === "USD") {
    return `USD ${new Intl.NumberFormat("es-AR").format(price)}`;
  }
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatKm(value: number): string {
  if (value === 0) return "0 km";
  return `${new Intl.NumberFormat("es-AR").format(value)} km`;
}
