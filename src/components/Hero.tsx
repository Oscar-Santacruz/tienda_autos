import { site } from "@/lib/site";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border"
    >
      {/* Fondo: video estilo Sote + overlays para mantener el texto legible */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <HeroVideo />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
        <p
          className="hero-stagger mb-6 inline-flex"
          style={{ transitionDelay: "80ms" }}
        >
          <span className="section-pill">
            {site.stats.city} · {site.stats.brands}
          </span>
        </p>
        <h1
          className="hero-stagger h-display max-w-4xl text-5xl sm:text-7xl"
          style={{ transitionDelay: "180ms" }}
        >
          Tu próximo vehículo,{" "}
          <span className="accent-serif text-6xl sm:text-8xl">
            con la confianza
          </span>{" "}
          que merecés.
        </h1>
        <p
          className="hero-stagger mt-7 max-w-2xl text-lg text-muted"
          style={{ transitionDelay: "300ms" }}
        >
          {site.description}
        </p>

        <div
          className="hero-stagger mt-10 flex flex-wrap gap-4"
          style={{ transitionDelay: "420ms" }}
        >
          <a
            href="#stock"
            className="rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-black shadow-[0_10px_30px_-10px_rgba(212,175,55,0.7)] transition-colors hover:bg-accent-hover"
          >
            Ver stock
          </a>
          <a
            href="#consignar"
            className="rounded-full border border-border px-7 py-3.5 text-sm font-bold uppercase tracking-[0.15em] transition-colors hover:border-accent hover:text-accent"
          >
            Consigná tu vehículo
          </a>
        </div>

        <div
          className="hero-stagger mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted"
          style={{ transitionDelay: "540ms" }}
        >
          <span>
            <span className="font-semibold text-foreground">0km y usados</span>{" "}
            de todas las marcas
          </span>
          <span className="hidden sm:inline text-border">•</span>
          <span>Tomamos consignaciones</span>
          <span className="hidden sm:inline text-border">•</span>
          <span>
            <span className="text-accent">＠</span> {site.stats.followers}{" "}
            seguidores en Instagram
          </span>
        </div>
      </div>
    </section>
  );
}
