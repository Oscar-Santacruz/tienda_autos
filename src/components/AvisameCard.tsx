"use client";

import { useState } from "react";
import { site } from "@/lib/site";

// "¿No encontrás lo que buscás?" (estilo Sote): el visitante deja qué auto
// quiere y su contacto, y el botón AVISAME abre WhatsApp con el pedido
// pre-armado para el equipo de ventas.

export function AvisameCard() {
  const [busca, setBusca] = useState("");
  const [contacto, setContacto] = useState("");

  const enviar = () => {
    const text = encodeURIComponent(
      `Hola! Estoy buscando: ${busca || "(no especificado)"}.` +
        (contacto ? ` Mi contacto: ${contacto}.` : "") +
        " ¿Me avisan apenas ingrese uno así? Gracias!",
    );
    window.open(
      `${site.contact.whatsappUrl}?text=${text}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div
      data-reveal
      className="mt-14 rounded-3xl border border-border bg-surface/80 p-8 backdrop-blur sm:p-10"
    >
      <div className="flex items-center justify-center gap-3">
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-accent" aria-hidden>
          <path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22zm8-6v-5c0-3.07-1.63-5.64-4.5-6.32V4a3.5 3.5 0 1 0-7 0v.68C5.63 5.36 4 7.92 4 11v5l-2 2v1h20v-1l-2-2z" />
        </svg>
        <h3 className="h-display text-center text-2xl sm:text-3xl">
          ¿No encontrás lo que buscás?
        </h3>
      </div>
      <p className="mt-3 text-center text-muted">
        Dejanos qué vehículo querés y te avisamos apenas ingrese uno así. Sin
        compromiso.
      </p>

      <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Qué buscás (ej: Toyota Hilux 2021 diésel)"
          className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
        />
        <input
          type="text"
          value={contacto}
          onChange={(e) => setContacto(e.target.value)}
          placeholder="Tu WhatsApp o email"
          className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
        />
        <button
          type="button"
          onClick={enviar}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-accent-hover"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
            <path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22zm8-6v-5c0-3.07-1.63-5.64-4.5-6.32V4a3.5 3.5 0 1 0-7 0v.68C5.63 5.36 4 7.92 4 11v5l-2 2v1h20v-1l-2-2z" />
          </svg>
          Avisame
        </button>
      </div>
    </div>
  );
}
