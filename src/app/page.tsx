import { Hero } from "@/components/Hero";
import { StockSection } from "@/components/StockSection";
import { Historia, Consignar, Resenas } from "@/components/InfoSections";
import { getCars } from "@/lib/cars";
import type { CarFilters, Category, Transmission } from "@/lib/types";

// La página lee filtros desde la URL (?category=SUV&maxPrice=50000...),
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
    transmission: get("transmission") as Transmission | undefined,
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
  const cars = await getCars(filters);

  return (
    <>
      <Hero />
      <StockSection cars={cars} />
      <Historia />
      <Consignar />
      <Resenas />
    </>
  );
}
