import { site } from "@/lib/site";

// Sección Ubicación (réplica de "TE ESPERAMOS EN Nordelta"): datos del
// showroom + mapa embebido de Google.

function Item({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-border/60 pb-5">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-accent" aria-hidden>
          <path d={icon} />
        </svg>
      </span>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted">
          {label}
        </p>
        <div className="mt-1.5 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export function Ubicacion() {
  return (
    <section id="ubicacion" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <span data-reveal className="section-pill">
            Visitanos
          </span>
          <h2 data-reveal className="h-display mt-6 text-4xl sm:text-5xl">
            Te esperamos en{" "}
            <span className="accent-serif text-5xl sm:text-6xl">Formosa</span>
          </h2>
          <p
            data-reveal
            className="mx-auto mt-5 max-w-2xl font-serif italic text-lg text-muted"
          >
            Un salón pensado para que elijas tranquilo tu próximo vehículo.
          </p>
        </div>

        <div
          data-reveal
          className="mt-12 grid overflow-hidden rounded-3xl border border-border bg-surface/80 backdrop-blur lg:grid-cols-2"
        >
          <div className="p-8 sm:p-10">
            <h3 className="h-display text-2xl">Prestige Motors Showroom</h3>
            <p className="mt-3 text-sm text-muted">
              Nuestras puertas están abiertas para asesorarte, mostrarte el
              stock y charlar de tu próximo proyecto sobre ruedas.
            </p>
            <div className="mt-8 space-y-5">
              <Item
                icon="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
                label="Dirección"
              >
                <a
                  href={site.contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  {site.contact.address}
                </a>
              </Item>
              <Item
                icon="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7z"
                label="Horario"
              >
                {site.contact.hours}
              </Item>
              <Item
                icon="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"
                label="WhatsApp"
              >
                <a
                  href={site.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  {site.contact.phones.join(" · ")}
                </a>
              </Item>
              <Item
                icon="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.15A3.99 3.99 0 1 1 16 12a3.99 3.99 0 0 1-4 3.99zm6.4-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z"
                label="Instagram"
              >
                <a
                  href={site.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  {site.contact.instagram} · {site.stats.followers}
                </a>
              </Item>
            </div>
          </div>

          <div className="min-h-[320px] lg:min-h-full">
            <iframe
              title="Mapa: Prestige Motors, España 1085, Formosa"
              src="https://www.google.com/maps?q=Espa%C3%B1a%201085%2C%20Formosa%2C%20Argentina&output=embed"
              className="h-full w-full border-0 grayscale-[35%] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
