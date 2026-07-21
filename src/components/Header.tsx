"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { OpenStatus } from "./OpenStatus";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="#top" className="flex shrink-0 items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 fill-accent"
            aria-hidden="true"
          >
            <path d="M2 8l4 3 6-7 6 7 4-3-2 11H4L2 8zm2.6 9.5h14.8l.28-1.5H4.32l.28 1.5z" />
          </svg>
          <span className="h-display text-lg tracking-[0.08em]">
            {site.name.split(" ")[0]}
            <span className="text-accent"> {site.name.split(" ")[1]}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link text-xs font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <span className="hidden items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted xl:inline-flex">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-accent"
              aria-hidden
            >
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
            </svg>
            <span className="font-bold text-foreground">
              +{site.stats.monthlyVisits}
            </span>{" "}
            visitas mensuales
          </span>
          <OpenStatus />
          <a
            href={site.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-accent-hover"
          >
            Contacto
          </a>
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden"
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-foreground" />
            <span className="block h-0.5 w-6 bg-foreground" />
            <span className="block h-0.5 w-6 bg-foreground" />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm uppercase tracking-wider text-muted hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-full bg-accent px-4 py-2 text-center text-sm font-semibold text-black"
            >
              Contacto
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
