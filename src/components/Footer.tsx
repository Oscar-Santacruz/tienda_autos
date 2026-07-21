import { site } from "@/lib/site";

// Footer 4 columnas (réplica de Sote): marca + redes, navegación, unidades y
// contacto, con barra inferior de copyright.

function Social({ href, label, d }: { href: string; label: string; d: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
    >
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" aria-hidden>
        <path d={d} />
      </svg>
    </a>
  );
}

const colTitle =
  "text-xs font-bold uppercase tracking-[0.3em] text-muted";

export function Footer() {
  return (
    <footer id="contacto" className="scroll-mt-16 bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div data-reveal>
          <p className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-accent" aria-hidden>
              <path d="M2 8l4 3 6-7 6 7 4-3-2 11H4L2 8zm2.6 9.5h14.8l.28-1.5H4.32l.28 1.5z" />
            </svg>
            <span className="h-display text-lg tracking-[0.08em]">
              {site.name.split(" ")[0]}
              <span className="text-accent"> {site.name.split(" ")[1]}</span>
            </span>
          </p>
          <p className="mt-4 max-w-xs text-sm text-muted">{site.description}</p>
          <div className="mt-6 flex gap-3">
            <Social
              href={site.contact.instagramUrl}
              label="Instagram"
              d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.15A3.99 3.99 0 1 1 16 12a3.99 3.99 0 0 1-4 3.99zm6.4-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z"
            />
            <Social
              href={site.contact.whatsappUrl}
              label="WhatsApp"
              d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24z"
            />
            <Social
              href={site.contact.websiteUrl}
              label="Sitio web"
              d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm7.93 9h-3.02a15.65 15.65 0 0 0-1.38-6.13A8.03 8.03 0 0 1 19.93 11zM12 4.04A13.9 13.9 0 0 1 13.9 11h-3.8A13.9 13.9 0 0 1 12 4.04zM4.26 13h3.02a15.65 15.65 0 0 0 1.38 6.13A8.03 8.03 0 0 1 4.26 13zm3.02-2H4.26a8.03 8.03 0 0 1 4.4-6.13A15.65 15.65 0 0 0 7.28 11zM12 19.96A13.9 13.9 0 0 1 10.1 13h3.8a13.9 13.9 0 0 1-1.9 6.96zm3.53-.83A15.65 15.65 0 0 0 16.91 13h3.02a8.03 8.03 0 0 1-4.4 6.13z"
            />
          </div>
        </div>

        <div data-reveal style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
          <h3 className={colTitle}>Navegación</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {site.nav.map((item) => (
              <li key={item.href + item.label}>
                <a href={item.href} className="text-foreground/85 hover:text-accent">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
          <h3 className={colTitle}>Unidades</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li><a href="#unidades" className="text-foreground/85 hover:text-accent">Prestige Motors</a></li>
            <li><a href="#consignar" className="text-foreground/85 hover:text-accent">Prestige Consignaciones</a></li>
            <li><a href="#servicios" className="text-foreground/85 hover:text-accent">Prestige Detailing</a></li>
            <li><a href="#stock" className="text-foreground/85 hover:text-accent">Stock 0km y usados</a></li>
          </ul>
        </div>

        <div data-reveal style={{ "--reveal-delay": "240ms" } as React.CSSProperties}>
          <h3 className={colTitle}>Contacto</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li>
              <a
                href={site.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/85 hover:text-accent"
              >
                WhatsApp: {site.contact.whatsapp}
              </a>
            </li>
            <li className="text-muted">Ventas: {site.contact.phones.join(" · ")}</li>
            {site.contact.email && (
              <li>
                <a href={`mailto:${site.contact.email}`} className="text-foreground/85 hover:text-accent">
                  {site.contact.email}
                </a>
              </li>
            )}
            <li className="text-muted">{site.contact.address}</li>
            <li className="text-muted">{site.contact.hours}</li>
            <li>
              <a
                href={site.contact.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/85 hover:text-accent"
              >
                {site.contact.website}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-6 text-xs text-muted sm:px-6">
          <span>
            © {new Date().getFullYear()} {site.name}. Todos los derechos
            reservados.
          </span>
          <span>
            {site.stats.city} · Instagram {site.contact.instagram}
          </span>
        </div>
      </div>
    </footer>
  );
}
