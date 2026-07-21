import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer id="contacto" className="scroll-mt-16 bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3">
        <div data-reveal>
          <p className="text-lg font-bold">
            {site.name.split(" ")[0]}
            <span className="text-accent"> {site.name.split(" ")[1]}</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            {site.description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
            Contacto
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={site.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                WhatsApp: {site.contact.whatsapp}
              </a>
            </li>
            <li className="text-muted">
              Ventas: {site.contact.phones.join(" · ")}
            </li>
            {site.contact.email && (
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="hover:text-accent"
                >
                  {site.contact.email}
                </a>
              </li>
            )}
            <li className="text-muted">{site.contact.address}</li>
            <li className="text-muted">{site.contact.hours}</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
            Seguinos
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={site.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                Instagram {site.contact.instagram}
              </a>
            </li>
            <li>
              <a
                href={site.contact.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                {site.contact.website}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-muted sm:px-6">
          © {new Date().getFullYear()} {site.name}. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
