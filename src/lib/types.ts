// Tipos del dominio de la tienda de autos.

export type Transmission = "Automático" | "Manual";

// Categorías presentes en el stock de Prestige Motors.
export type Category =
  | "SUV"
  | "Sedán"
  | "Pick-up"
  | "Hatchback"
  | "Utilitario"
  | "Camión"
  | "Moto"
  | "Náutica";

export type Fuel = "Nafta" | "Diésel" | "Híbrido" | "Eléctrico";

// El stock mezcla precios en pesos argentinos y en dólares.
export type Currency = "ARS" | "USD";

export type CarStatus = "disponible" | "reservado" | "vendido";

export interface Car {
  id: string;
  brand: string;
  model: string;
  version: string | null;
  year: number;
  km: number;
  // Precio en la moneda indicada por `currency`. `null` = "Consultar".
  price: number | null;
  currency: Currency;
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
  brand?: string;
  transmission?: Transmission;
  fuel?: Fuel;
  maxKm?: number;
  // Rango de precio expresado en pesos (ARS). Las unidades en USD se
  // comparan usando su equivalente aproximado (ver priceInArs).
  minPrice?: number;
  maxPrice?: number;
  query?: string;
  sort?: "recientes" | "precio_asc" | "precio_desc" | "km_asc";
}
