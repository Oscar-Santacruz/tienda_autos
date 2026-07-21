"use client";

import { useState } from "react";
import { site } from "@/lib/site";

// Sección Consignar (réplica del layout de Sote):
// - Izquierda: título display + checklist + tasador rápido ("Tasá tu usado
//   gratis, al instante").
// - Derecha: formulario "Solicitá tu tasación" con envío por WhatsApp o
//   consulta online (Instagram DM).
// No hay backend: ambos botones arman el mensaje y lo mandan por WhatsApp.

const BENEFICIOS = [
  "Tasación profesional y transparente",
  "Publicación con fotos de showroom incluida",
  "Difusión a +34 mil seguidores en Instagram",
  "Filtramos contactos y atendemos todas las visitas",
  "Gestoría y transferencia 100% incluidas",
];

const inputClass =
  "w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-foreground placeholder:text-muted/70 focus:border-accent focus:outline-none";

function waOpen(text: string) {
  window.open(
    `${site.contact.whatsappUrl}?text=${encodeURIComponent(text)}`,
    "_blank",
    "noopener,noreferrer",
  );
}

function Check() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15">
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-accent" aria-hidden>
        <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
      </svg>
    </span>
  );
}

function TasadorRapido() {
  const [f, setF] = useState({ marca: "", modelo: "", anio: "", km: "" });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  const pedir = () => {
    waOpen(
      `Hola! Quiero tasar mi ${f.marca || "(marca)"} ${f.modelo || "(modelo)"} ` +
        `${f.anio || "(año)"} con ${f.km || "(km)"} km. ¿Me pasan un valor estimado?`,
    );
  };

  return (
    <div
      data-reveal
      className="mt-10 rounded-3xl border border-border bg-surface/80 p-7 backdrop-blur"
    >
      <div className="flex items-center gap-2.5">
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-accent" aria-hidden>
          <path d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8V2zm1 3v6h6a7 7 0 0 0-6-6z" />
        </svg>
        <h3 className="h-display text-xl">Tasá tu usado gratis, al instante</h3>
      </div>
      <p className="mt-2 text-sm text-muted">
        Estimación orientativa según marca, modelo, año y km. El valor final lo
        confirma un asesor.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <input placeholder="Marca (ej: Ford)" value={f.marca} onChange={set("marca")} className={inputClass} />
        <input placeholder="Modelo (ej: Ranger)" value={f.modelo} onChange={set("modelo")} className={inputClass} />
        <input placeholder="Año (ej: 2020)" value={f.anio} onChange={set("anio")} className={inputClass} />
        <input placeholder="Km (ej: 60.000)" value={f.km} onChange={set("km")} className={inputClass} />
      </div>
      <button
        type="button"
        onClick={pedir}
        className="mt-4 w-full rounded-xl bg-accent py-3 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-accent-hover"
      >
        Ver valor estimado
      </button>
    </div>
  );
}

function FormTasacion() {
  const [f, setF] = useState({
    nombre: "",
    telefono: "",
    email: "",
    vehiculo: "",
    km: "",
    comentarios: "",
  });
  const set =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setF((p) => ({ ...p, [k]: e.target.value }));

  const mensaje = () =>
    `Hola! Quiero consignar mi vehículo.\n` +
    `• Nombre: ${f.nombre || "-"}\n` +
    `• Teléfono: ${f.telefono || "-"}\n` +
    (f.email ? `• Email: ${f.email}\n` : "") +
    `• Vehículo: ${f.vehiculo || "-"}\n` +
    `• Kilometraje: ${f.km || "-"}\n` +
    (f.comentarios ? `• Comentarios: ${f.comentarios}` : "");

  const label = "text-xs font-semibold uppercase tracking-[0.2em] text-muted";

  return (
    <div
      data-reveal
      className="rounded-3xl border border-border bg-surface/80 p-7 backdrop-blur sm:p-9"
      style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
    >
      <h3 className="h-display text-2xl">Solicitá tu tasación</h3>
      <p className="mt-2 text-sm text-muted">
        Completá el formulario y elegí cómo querés que te contactemos.
        Respondemos en menos de 24 hs.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Nombre</label>
          <input placeholder="Tu nombre" value={f.nombre} onChange={set("nombre")} className={`mt-1.5 ${inputClass}`} />
        </div>
        <div>
          <label className={label}>Teléfono</label>
          <input placeholder="+54 9 370..." value={f.telefono} onChange={set("telefono")} className={`mt-1.5 ${inputClass}`} />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Email</label>
          <input placeholder="tu@email.com" value={f.email} onChange={set("email")} className={`mt-1.5 ${inputClass}`} />
        </div>
        <div>
          <label className={label}>Marca y modelo</label>
          <input placeholder="Ej: Toyota SW4 2022" value={f.vehiculo} onChange={set("vehiculo")} className={`mt-1.5 ${inputClass}`} />
        </div>
        <div>
          <label className={label}>Kilometraje</label>
          <input placeholder="Ej: 35.000" value={f.km} onChange={set("km")} className={`mt-1.5 ${inputClass}`} />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Comentarios (opcional)</label>
          <textarea
            placeholder="Contanos detalles del vehículo…"
            rows={3}
            value={f.comentarios}
            onChange={set("comentarios")}
            className={`mt-1.5 ${inputClass} resize-y`}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => waOpen(mensaje())}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-transform hover:scale-[1.02]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24z" />
          </svg>
          Enviar por WhatsApp
        </button>
        <a
          href={site.contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-accent-hover"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
            <path d="M2 21l19-9L2 3v7l13 2-13 2v7z" />
          </svg>
          Solicitar online
        </a>
      </div>
    </div>
  );
}

export function Consignar() {
  return (
    <section id="consignar" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 data-reveal className="h-display max-w-xl text-4xl sm:text-5xl">
            Vendé tu auto al{" "}
            <span className="accent-serif text-5xl sm:text-6xl">
              mejor precio
            </span>
            , sin que muevas un dedo.
          </h2>
          <p data-reveal className="mt-5 max-w-xl text-lg text-muted">
            Dejanos tu vehículo en consignación. Nosotros nos encargamos de
            todo: fotografía, exhibición en el salón, llamados, visitas,
            gestión y firma final.
          </p>

          <ul className="mt-8 space-y-4">
            {BENEFICIOS.map((b, i) => (
              <li
                key={b}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="flex items-center gap-3 border-b border-border/60 pb-4 text-foreground"
              >
                <Check />
                {b}
              </li>
            ))}
          </ul>

          <TasadorRapido />
        </div>

        <FormTasacion />
      </div>
    </section>
  );
}
