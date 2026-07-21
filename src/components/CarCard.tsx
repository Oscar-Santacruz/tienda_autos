import Image from "next/image";
import type { Car } from "@/lib/types";
import { formatKm, formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

// Ficha de vehículo (réplica del layout de Sote): badge arriba a la izquierda,
// marca en dorado espaciado, modelo en tipografía display, fila de datos con
// iconitos, precio grande y CTA "Consultar".

function MetaIcon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-accent" aria-hidden>
      <path d={d} />
    </svg>
  );
}

export function CarCard({ car, index = 0 }: { car: Car; index?: number }) {
  const title = `${car.brand} ${car.model}`;
  const waText = encodeURIComponent(
    `Hola! Me interesa el ${title} ${car.year}${
      car.version ? ` (${car.version})` : ""
    }. ¿Sigue disponible?`,
  );
  const waHref = `${site.contact.whatsappUrl}?text=${waText}`;

  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as React.CSSProperties}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_20px_45px_-20px_rgba(212,175,55,0.35)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        {car.image_url ? (
          <Image
            src={car.image_url}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted">
            Sin foto
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-md bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-black">
          {car.km === 0 ? "0km" : car.featured ? "Premium" : car.category}
        </span>
        {car.status === "reservado" && (
          <span className="absolute right-3 top-3 rounded-md bg-black/75 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-accent backdrop-blur">
            Reservado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
          {car.brand}
        </p>
        <h3 className="h-display mt-1 truncate text-xl" title={title}>
          {car.model} {car.version ?? ""}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-b border-border/70 pb-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <MetaIcon d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z" />
            {car.year}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MetaIcon d="M12 2a10 10 0 0 0-7.35 16.76l1.45-1.45A8 8 0 1 1 20 12h2A10 10 0 0 0 12 2zm-1 5v6l4.25 2.52.75-1.23-3.5-2.08V7h-1.5z" />
            {formatKm(car.km)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MetaIcon d="M19.77 7.23 16.06 3.5l-1.06 1.06 2.11 2.11A2.5 2.5 0 0 0 18.5 11c.17 0 .34-.02.5-.05v7.55a1 1 0 1 1-2 0V14a2 2 0 0 0-2-2h-1V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v16h10v-4.5h1a.5.5 0 0 1 .5.5v2.5a2.5 2.5 0 0 0 5 0V9c0-.69-.28-1.32-.73-1.77zM12 9H6V4h6v5z" />
            {car.fuel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MetaIcon d="M12 2 4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" />
            {car.transmission === "Automático" ? "Automática" : "Manual"}
          </span>
        </div>

        <div className="mt-4 flex flex-1 items-end justify-between gap-3">
          <p className="h-display text-2xl text-foreground">
            {formatPrice(car.price, car.currency)}
          </p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-xs font-bold uppercase tracking-[0.15em] transition-colors hover:border-accent hover:bg-accent hover:text-black"
          >
            Consultar
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
              <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
