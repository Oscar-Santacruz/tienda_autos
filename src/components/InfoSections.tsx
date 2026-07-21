import { site } from "@/lib/site";

// Reseñas de ejemplo con formato "reseña de Google" (estilo Sote).
// Reemplazar por reseñas reales del perfil de Google del negocio.
const RESENAS = [
  {
    name: "Carla M.",
    meta: "Reseña en Google · hace 2 semanas",
    text: "Atención impecable de principio a fin. Me ayudaron con toda la gestión y el auto estaba tal cual lo publicado.",
  },
  {
    name: "Diego R.",
    meta: "Local Guide · 14 opiniones",
    text: "Compré desde el interior, me mandaron videos y fotos reales. Todo transparente. Súper recomendables.",
  },
  {
    name: "Lucía F.",
    meta: "Reseña en Google · hace 1 mes",
    text: "Consigné mi camioneta y en dos semanas estaba vendida al precio que quería. Cero dolor de cabeza.",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.57-5.17 3.57-8.81z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3c-1.08.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.29 14.28A7.2 7.2 0 0 1 4.91 12c0-.79.14-1.56.38-2.28V6.63H1.29a12 12 0 0 0 0 10.74l4-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.94 1.19 15.23 0 12 0 7.31 0 3.26 2.69 1.29 6.63l4 3.09c.94-2.85 3.59-4.95 6.71-4.95z"
      />
    </svg>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5 text-[#ffc21a]" aria-label="5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export function Historia() {
  return (
    <section id="historia" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div data-reveal>
          <span className="section-pill">Prestige Motors · Formosa</span>
          <h2 className="h-display mt-6 text-4xl sm:text-5xl">
            Quiénes{" "}
            <span className="accent-serif text-5xl sm:text-6xl">somos</span>
          </h2>
          <p className="mt-6 text-lg text-muted">
            Somos <span className="text-foreground">Prestige Motors</span>, una
            concesionaria de {site.stats.city}. Vendemos vehículos 0km y usados
            de todas las marcas, con atención personalizada y acompañamiento en
            toda la operación.
          </p>
          <p className="mt-4 text-lg text-muted">
            Cada unidad se revisa y se publica con información real. También
            tomamos tu vehículo en consignación y gestionamos la venta por vos.
          </p>
        </div>
        <div
          className="grid grid-cols-2 gap-4"
          data-reveal
          style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
        >
          <Stat value={site.stats.brands} label="disponibles" />
          <Stat value="0km y usados" label="en stock" />
          <Stat value={site.stats.followers} label="seguidores en Instagram" />
          <Stat value="Consignaciones" label="tomamos tu vehículo" />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface/80 p-6 backdrop-blur">
      <p className="h-display text-2xl text-accent">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}

export function Resenas() {
  return (
    <section id="resenas" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <span data-reveal className="section-pill">
            <GoogleG className="h-3.5 w-3.5" /> Reseñas reales · Google
          </span>
          <h2
            data-reveal
            className="h-display mt-6 flex flex-wrap items-center justify-center gap-x-4 text-5xl sm:text-6xl"
          >
            <span>{site.stats.rating}</span>
            <svg
              viewBox="0 0 24 24"
              className="h-11 w-11 fill-[#ffc21a] sm:h-13 sm:w-13"
              aria-hidden
            >
              <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span>sobre</span>
            <span className="accent-serif text-6xl sm:text-7xl">
              {site.stats.reviews} reseñas
            </span>
          </h2>
          <p data-reveal className="mt-5 font-serif italic text-lg text-muted">
            Lo que opinan nuestros clientes en Google Maps.{" "}
            <a
              href={site.contact.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-4 hover:text-accent-hover"
            >
              Ver todas en Google →
            </a>
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {RESENAS.map((r, i) => (
            <figure
              key={r.name}
              data-reveal
              style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
              className="relative rounded-2xl border border-border bg-surface/80 p-7 backdrop-blur"
            >
              <span
                className="pointer-events-none absolute right-6 top-5 font-serif text-6xl italic leading-none text-accent/25"
                aria-hidden
              >
                ”
              </span>
              <Stars />
              <blockquote className="mt-4 font-serif text-lg italic leading-relaxed text-foreground/90">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent font-bold text-black">
                  {initials(r.name)}
                </span>
                <span>
                  <span className="block text-sm font-bold">{r.name}</span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                    <GoogleG className="h-3.5 w-3.5" />
                    {r.meta}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
