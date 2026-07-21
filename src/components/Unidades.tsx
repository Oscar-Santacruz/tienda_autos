import Image from "next/image";
import { site } from "@/lib/site";

// Sección "Unidades de negocio" (réplica de las cards SOTE AUTOMOTORES /
// DAILY / DETAILING), adaptada a las áreas de Prestige Motors.

const UNIDADES = [
  {
    badge: "0km y usados",
    titulo: "Prestige Motors",
    desc: "Nuestra unidad madre. Vehículos 0km y usados de todas las marcas, seleccionados y revisados, con la atención que merece tu próximo auto.",
    bullets: ["Compra · Venta · Permuta", "Todas las marcas", "0km y usados"],
    img: "/placeholders/unidad-motors.jpg",
  },
  {
    badge: "Consignaciones",
    titulo: "Prestige Consignaciones",
    desc: "Dejá tu vehículo en nuestras manos: lo exhibimos, atendemos las consultas y gestionamos la venta completa por vos.",
    bullets: [
      "Tasación transparente",
      "Exhibición en salón",
      "Gestión y firma incluidas",
    ],
    img: "/placeholders/unidad-consignaciones.jpg",
  },
  {
    badge: "Detailing",
    titulo: "Prestige Detailing",
    desc: "Estética vehicular del más alto nivel. Cuidamos cada detalle de tu auto como si fuera nuestro.",
    bullets: [
      "Detailing & estética premium",
      "Polarizados y PPF",
      "Chapa, pintura y reparación",
    ],
    img: "/placeholders/unidad-detailing.jpg",
  },
];

export function Unidades() {
  return (
    <section id="unidades" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <span data-reveal className="section-pill">
            Grupo Prestige
          </span>
          <h2 data-reveal className="h-display mt-6 text-4xl sm:text-5xl">
            Nuestras{" "}
            <span className="accent-serif text-5xl sm:text-6xl">unidades</span>
          </h2>
          <p
            data-reveal
            className="mx-auto mt-5 max-w-2xl font-serif italic text-lg text-muted"
          >
            Cada cliente, cada auto y cada necesidad tiene su unidad
            especializada dentro de Prestige Motors.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {UNIDADES.map((u, i) => (
            <div
              key={u.titulo}
              data-reveal
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface/80 backdrop-blur transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_20px_45px_-20px_rgba(212,175,55,0.35)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-surface-2">
                <Image
                  src={u.img}
                  alt={u.titulo}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                  {u.badge}
                </span>
                <span className="h-display absolute bottom-3 left-4 text-lg tracking-[0.2em] text-white drop-shadow">
                  {u.titulo}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm text-muted">{u.desc}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {u.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2.5 text-sm text-foreground/90"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
                <a
                  href={site.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 border-t border-border/70 pt-4 text-xs font-bold uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.15A3.99 3.99 0 1 1 16 12a3.99 3.99 0 0 1-4 3.99zm6.4-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z" />
                  </svg>
                  Ver Instagram
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
