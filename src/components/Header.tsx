"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="#top" className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight">
            {site.name.split(" ")[0]}
            <span className="text-accent"> {site.name.split(" ")[1]}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={site.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-accent-hover"
          >
            Contactar
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
                className="py-2 text-sm text-muted hover:text-foreground"
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
              Contactar
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
