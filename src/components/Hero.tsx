import { site } from "@/lib/site";
import { HeroParticles } from "./effects/HeroParticles";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border"
    >
      {/* Fondo con gradiente premium + partículas doradas ambientales */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>
      <HeroParticles />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
        <p
          className="hero-stagger mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent"
          style={{ transitionDelay: "80ms" }}
        >
          {site.stats.city} · {site.stats.brands}
        </p>
        <h1
          className="hero-stagger max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
          style={{ transitionDelay: "180ms" }}
        >
          {site.tagline}
        </h1>
        <p
          className="hero-stagger mt-6 max-w-2xl text-lg text-muted"
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
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent-hover"
          >
            Ver stock
          </a>
          <a
            href="#consignar"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
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
