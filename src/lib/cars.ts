import "server-only";
import type { Car, CarFilters } from "./types";
import { SEED_CARS } from "./seed-data";
import { priceInArs, USD_TO_ARS } from "./format";
import { isSupabaseConfigured } from "./supabase/config";
import { createClient } from "./supabase/server";

// Capa de datos del stock.
// - Con Supabase configurado: consulta la tabla `cars`.
// - Sin configurar: usa datos de ejemplo (SEED_CARS) y filtra en memoria.
// Así el proyecto arranca y se previsualiza sin base de datos.
//
// El stock mezcla precios en ARS y USD. Para ordenar y filtrar por precio se
// normaliza todo a pesos con priceInArs (cotización aproximada USD_TO_ARS).

function applyFiltersInMemory(cars: Car[], filters: CarFilters): Car[] {
  let result = cars.filter((c) => c.status !== "vendido");

  if (filters.category) {
    result = result.filter((c) => c.category === filters.category);
  }
  if (filters.brand) {
    result = result.filter((c) => c.brand === filters.brand);
  }
  if (filters.transmission) {
    result = result.filter((c) => c.transmission === filters.transmission);
  }
  if (filters.fuel) {
    result = result.filter((c) => c.fuel === filters.fuel);
  }
  if (filters.maxKm != null) {
    result = result.filter((c) => c.km <= filters.maxKm!);
  }
  if (filters.minPrice != null || filters.maxPrice != null) {
    result = result.filter((c) => {
      const ars = priceInArs(c.price, c.currency);
      if (ars == null) return false; // "Consultar" queda fuera del rango
      if (filters.minPrice != null && ars < filters.minPrice) return false;
      if (filters.maxPrice != null && ars > filters.maxPrice) return false;
      return true;
    });
  }
  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter((c) =>
      `${c.brand} ${c.model} ${c.version ?? ""}`.toLowerCase().includes(q),
    );
  }

  const ars = (c: Car) => priceInArs(c.price, c.currency) ?? Infinity;
  switch (filters.sort) {
    case "precio_asc":
      result.sort((a, b) => ars(a) - ars(b));
      break;
    case "precio_desc":
      result.sort((a, b) => ars(b) - ars(a));
      break;
    case "km_asc":
      result.sort((a, b) => a.km - b.km);
      break;
    default:
      result.sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  return result;
}

export async function getCars(filters: CarFilters = {}): Promise<Car[]> {
  if (!isSupabaseConfigured) {
    return applyFiltersInMemory(SEED_CARS, filters);
  }

  const supabase = await createClient();
  // `price_ars` es una columna generada (ver migración) = price normalizado a
  // pesos, para poder filtrar/ordenar mezclando monedas.
  let query = supabase.from("cars").select("*").neq("status", "vendido");

  if (filters.category) query = query.eq("category", filters.category);
  if (filters.brand) query = query.eq("brand", filters.brand);
  if (filters.transmission)
    query = query.eq("transmission", filters.transmission);
  if (filters.fuel) query = query.eq("fuel", filters.fuel);
  if (filters.maxKm != null) query = query.lte("km", filters.maxKm);
  if (filters.minPrice != null) query = query.gte("price_ars", filters.minPrice);
  if (filters.maxPrice != null) query = query.lte("price_ars", filters.maxPrice);
  if (filters.query) {
    query = query.or(
      `brand.ilike.%${filters.query}%,model.ilike.%${filters.query}%,version.ilike.%${filters.query}%`,
    );
  }

  switch (filters.sort) {
    case "precio_asc":
      query = query.order("price_ars", { ascending: true, nullsFirst: false });
      break;
    case "precio_desc":
      query = query.order("price_ars", { ascending: false, nullsFirst: false });
      break;
    case "km_asc":
      query = query.order("km", { ascending: true });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;
  if (error) {
    console.error("[getCars] Supabase error:", error.message);
    // Fallback a seed para no romper la UI.
    return applyFiltersInMemory(SEED_CARS, filters);
  }
  return (data as Car[]) ?? [];
}

export async function getFeaturedCars(limit = 6): Promise<Car[]> {
  const cars = await getCars({ sort: "recientes" });
  const featured = cars.filter((c) => c.featured);
  return (featured.length > 0 ? featured : cars).slice(0, limit);
}

/** Lista de marcas presentes en el stock (para el filtro). */
export async function getBrands(): Promise<string[]> {
  const cars = await getCars();
  return Array.from(new Set(cars.map((c) => c.brand))).sort();
}

export { USD_TO_ARS };
