import { site } from "@/lib/site";

// Sección de servicios de estética (réplica del "SOTE DETAILING"), adaptada a
// Prestige Motors. Cada card pide turno por WhatsApp con mensaje pre-armado.

const SERVICIOS = [
  {
    titulo: "Detailing & estética premium",
    desc: "Lavado técnico, descontaminado, pulido y tratamiento cerámico. Interior y exterior como el primer día.",
    icon: "M19.36 2.72l1.42 1.42-5.72 5.71c1.07 1.54 1.22 3.39.32 4.59L9.06 8.12c1.2-.9 3.05-.75 4.59.32l5.71-5.72zM5.93 17.57c-2.01-2.01-3.24-4.41-3.58-6.65l4.88-2.09 7.44 7.44-2.09 4.88c-2.24-.34-4.64-1.57-6.65-3.58z",
  },
  {
    titulo: "Polarizados",
    desc: "Films de control solar de alta gama: más frescura, privacidad y protección UV. Colocación prolija y garantizada.",
    icon: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0-5v3m0 14v3M2 12h3m14 0h3M4.9 4.9l2.1 2.1m10 10 2.1 2.1m0-14.2-2.1 2.1m-10 10-2.1 2.1",
  },
  {
    titulo: "PPF · Paint Protection Film",
    desc: "Lámina transparente que protege la pintura de piedrazos, rayones y el sol. Ideal para 0km y premium.",
    icon: "M12 2 4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z",
  },
  {
    titulo: "Chapa, pintura y reparación",
    desc: "Restauración y reparación con terminación de fábrica. Dejamos tu vehículo impecable.",
    icon: "M18 4V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6h1v4H9v11a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-9h8V4h-3z",
  },
];

export function Servicios() {
  return (
    <section id="servicios" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <span data-reveal className="section-pill">
            Prestige Detailing
          </span>
          <h2 data-reveal className="h-display mt-6 text-4xl sm:text-5xl">
            Servicios de{" "}
            <span className="accent-serif text-5xl sm:text-6xl">
              estética y protección
            </span>
          </h2>
          <p
            data-reveal
            className="mx-auto mt-5 max-w-2xl font-serif italic text-lg text-muted"
          >
            Cuidamos tu vehículo como si fuera nuestro. Detailing, polarizado,
            PPF y chapa &amp; pintura con terminación de showroom, en Formosa.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICIOS.map((s, i) => (
            <div
              key={s.titulo}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              className="flex flex-col rounded-2xl border border-border bg-surface/80 p-6 backdrop-blur transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_20px_45px_-20px_rgba(212,175,55,0.35)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-accent"
                  aria-hidden
                >
                  <path d={s.icon} />
                </svg>
              </span>
              <h3 className="mt-5 text-lg font-bold leading-snug">{s.titulo}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{s.desc}</p>
              <a
                href={`${site.contact.whatsappUrl}?text=${encodeURIComponent(
                  `Hola! Quiero pedir turno para: ${s.titulo}.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/60 py-2.5 text-sm font-semibold text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-black"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                  aria-hidden
                >
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24z" />
                </svg>
                Pedir turno
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
