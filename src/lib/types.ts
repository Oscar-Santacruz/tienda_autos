// Tipos del dominio de la tienda de autos.

export type Transmission = "Automático" | "Manual";

export type Category =
  | "SUV"
  | "Sedán"
  | "Pick-up"
  | "Hatchback"
  | "Deportivo"
  | "Clásico";

export type Fuel = "Nafta" | "Diésel" | "Híbrido" | "Eléctrico";

export type CarStatus = "disponible" | "reservado" | "vendido";

export interface Car {
  id: string;
  brand: string;
  model: string;
  version: string | null;
  year: number;
  km: number;
  price_usd: number;
  transmission: Transmission;
  fuel: Fuel;
  category: Category;
  color: string | null;
  image_url: string | null;
  featured: boolean;
  status: CarStatus;
  created_at: string;
}

// Filtros aplicables sobre el stock (leídos desde la URL).
export interface CarFilters {
  category?: Category;
  transmission?: Transmission;
  maxKm?: number;
  minPrice?: number;
  maxPrice?: number;
  query?: string;
  sort?: "recientes" | "precio_asc" | "precio_desc" | "km_asc";
}
