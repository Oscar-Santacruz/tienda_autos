import "server-only";
import type { Car, CarFilters } from "./types";
import { SEED_CARS } from "./seed-data";
import { isSupabaseConfigured } from "./supabase/config";
import { createClient } from "./supabase/server";

// Capa de datos del stock.
// - Con Supabase configurado: consulta la tabla `cars`.
// - Sin configurar: usa datos de ejemplo (SEED_CARS) y filtra en memoria.
// Así el proyecto arranca y se previsualiza sin base de datos.

function applyFiltersInMemory(cars: Car[], filters: CarFilters): Car[] {
  let result = cars.filter((c) => c.status !== "vendido");

  if (filters.category) {
    result = result.filter((c) => c.category === filters.category);
  }
  if (filters.transmission) {
    result = result.filter((c) => c.transmission === filters.transmission);
  }
  if (filters.maxKm != null) {
    result = result.filter((c) => c.km <= filters.maxKm!);
  }
  if (filters.minPrice != null) {
    result = result.filter((c) => c.price_usd >= filters.minPrice!);
  }
  if (filters.maxPrice != null) {
    result = result.filter((c) => c.price_usd <= filters.maxPrice!);
  }
  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter((c) =>
      `${c.brand} ${c.model} ${c.version ?? ""}`.toLowerCase().includes(q),
    );
  }

  switch (filters.sort) {
    case "precio_asc":
      result.sort((a, b) => a.price_usd - b.price_usd);
      break;
    case "precio_desc":
      result.sort((a, b) => b.price_usd - a.price_usd);
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
  let query = supabase.from("cars").select("*").neq("status", "vendido");

  if (filters.category) query = query.eq("category", filters.category);
  if (filters.transmission)
    query = query.eq("transmission", filters.transmission);
  if (filters.maxKm != null) query = query.lte("km", filters.maxKm);
  if (filters.minPrice != null) query = query.gte("price_usd", filters.minPrice);
  if (filters.maxPrice != null) query = query.lte("price_usd", filters.maxPrice);
  if (filters.query) {
    query = query.or(
      `brand.ilike.%${filters.query}%,model.ilike.%${filters.query}%,version.ilike.%${filters.query}%`,
    );
  }

  switch (filters.sort) {
    case "precio_asc":
      query = query.order("price_usd", { ascending: true });
      break;
    case "precio_desc":
      query = query.order("price_usd", { ascending: false });
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
