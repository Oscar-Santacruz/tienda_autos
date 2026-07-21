export function formatUSD(value: number): string {
  return new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatKm(value: number): string {
  return `${new Intl.NumberFormat("es-PY").format(value)} km`;
}
