import Image from "next/image";
import type { Car } from "@/lib/types";
import { formatKm, formatUSD } from "@/lib/format";
import { site } from "@/lib/site";

export function CarCard({ car }: { car: Car }) {
  const title = `${car.brand} ${car.model}`;
  const waText = encodeURIComponent(
    `Hola! Me interesa el ${title} ${car.year}. ¿Sigue disponible?`,
  );
  const waHref = `${site.contact.whatsappUrl}?text=${waText}`;

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/50">
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
        {car.status === "reservado" && (
          <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-accent backdrop-blur">
            Reservado
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium backdrop-blur">
          {car.category}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold leading-tight">{title}</h3>
            {car.version && (
              <p className="mt-0.5 line-clamp-1 text-sm text-muted">
                {car.version}
              </p>
            )}
          </div>
          <p className="whitespace-nowrap text-lg font-bold text-accent">
            {formatUSD(car.price_usd)}
          </p>
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-muted">
          <div className="rounded-lg bg-surface-2 py-2">
            <dt className="sr-only">Año</dt>
            <dd className="font-medium text-foreground">{car.year}</dd>
          </div>
          <div className="rounded-lg bg-surface-2 py-2">
            <dt className="sr-only">Kilómetros</dt>
            <dd className="font-medium text-foreground">{formatKm(car.km)}</dd>
          </div>
          <div className="rounded-lg bg-surface-2 py-2">
            <dt className="sr-only">Transmisión</dt>
            <dd className="font-medium text-foreground">
              {car.transmission === "Automático" ? "Aut." : "Man."}
            </dd>
          </div>
        </dl>

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block rounded-full border border-border py-2.5 text-center text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
        >
          Consultar
        </a>
      </div>
    </article>
  );
}
