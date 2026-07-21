import { Hero } from "@/components/Hero";
import { Unidades } from "@/components/Unidades";
import { StockSection } from "@/components/StockSection";
import { Historia, Resenas } from "@/components/InfoSections";
import { Consignar } from "@/components/Consignar";
import { Servicios } from "@/components/Servicios";
import { Faq } from "@/components/Faq";
import { Ubicacion } from "@/components/Ubicacion";
import { SocialProofToasts } from "@/components/SocialProofToasts";
import { getCars, getBrands } from "@/lib/cars";
import type { CarFilters, Category, Fuel, Transmission } from "@/lib/types";

// La página lee filtros desde la URL (?category=SUV&maxPrice=50000000...),
// por eso usa `searchParams` (dynamic rendering).
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function parseFilters(sp: Record<string, string | string[] | undefined>): CarFilters {
  const get = (k: string) => {
    const v = sp[k];
    return typeof v === "string" && v.length > 0 ? v : undefined;
  };
  const num = (k: string) => {
    const v = get(k);
    return v ? Number(v) : undefined;
  };

  return {
    category: get("category") as Category | undefined,
    brand: get("brand"),
    transmission: get("transmission") as Transmission | undefined,
    fuel: get("fuel") as Fuel | undefined,
    maxKm: num("maxKm"),
    minPrice: num("minPrice"),
    maxPrice: num("maxPrice"),
    query: get("query"),
    sort: get("sort") as CarFilters["sort"],
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const filters = parseFilters(await searchParams);
  const [cars, allCars, brands] = await Promise.all([
    getCars(filters),
    getCars(),
    getBrands(),
  ]);

  const toastItems = allCars.slice(0, 12).map((c) => `${c.brand} ${c.model}`);

  return (
    <>
      <Hero />
      <Unidades />
      <StockSection cars={cars} allCars={allCars} brands={brands} />
      <Historia />
      <Resenas />
      <Consignar />
      <Servicios />
      <Faq />
      <Ubicacion />
      <SocialProofToasts items={toastItems} />
    </>
  );
}
