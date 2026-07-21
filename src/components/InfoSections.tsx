import { site } from "@/lib/site";

const RESENAS = [
  {
    name: "Carla M.",
    text: "Atención impecable de principio a fin. Me ayudaron con toda la gestión y el auto estaba tal cual lo publicado.",
  },
  {
    name: "Diego R.",
    text: "Compré desde el interior, me mandaron videos y fotos reales. Todo transparente. Súper recomendables.",
  },
  {
    name: "Lucía F.",
    text: "Consigné mi camioneta y en dos semanas estaba vendida al precio que quería. Cero dolor de cabeza.",
  },
];

export function Historia() {
  return (
    <section id="historia" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div data-reveal>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Quiénes somos
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
        <div className="grid grid-cols-2 gap-4" data-reveal style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
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
    <div className="rounded-2xl border border-border bg-surface p-6">
      <p className="text-3xl font-bold text-accent">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}

export function Consignar() {
  return (
    <section id="consignar" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div data-reveal className="rounded-3xl border border-border bg-gradient-to-br from-surface to-background p-8 sm:p-12">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            ¿Querés vender tu auto? Consignalo con nosotros
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Nos ocupamos de todo: fotografía profesional, publicación, atención
            de consultas, visitas y gestión completa. Vos solo cobrás.
          </p>
          <a
            href={site.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent-hover"
          >
            Quiero consignar
          </a>
        </div>
      </div>
    </section>
  );
}

export function Resenas() {
  return (
    <section id="resenas" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 data-reveal className="text-3xl font-bold tracking-tight sm:text-4xl">
          Lo que dicen nuestros clientes
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {RESENAS.map((r, i) => (
            <figure
              key={r.name}
              data-reveal
              style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <div className="text-accent">★★★★★</div>
              <blockquote className="mt-3 text-muted">“{r.text}”</blockquote>
              <figcaption className="mt-4 text-sm font-semibold">
                {r.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
