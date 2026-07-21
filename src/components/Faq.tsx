// FAQ acordeón (réplica de "TODO LO QUE necesitás saber"), con
// <details>/<summary> nativos — sin JavaScript extra.

const FAQS = [
  {
    q: "¿Puedo comprar en cuotas? ¿Financian la compra?",
    a: "Trabajamos distintas alternativas de financiación según la unidad. Escribinos por WhatsApp con el vehículo que te interesa y te pasamos las opciones disponibles.",
  },
  {
    q: "¿Toman mi usado como parte de pago (permuta)?",
    a: "Sí. Tasamos tu usado y lo tomamos como parte de pago. Traelo al salón o mandanos fotos y datos por WhatsApp para una tasación orientativa.",
  },
  {
    q: "¿Cómo funciona dejar mi auto en consignación?",
    a: "Lo tasamos juntos, lo exhibimos en el salón, atendemos consultas y visitas, y gestionamos la venta y la transferencia. Vos solo cobrás. Sin costos por adelantado.",
  },
  {
    q: "¿Los vehículos están revisados?",
    a: "Cada unidad se revisa y se publica con información real de año, kilometraje y estado. Podés verla y probarla en nuestro salón de España 1085, Formosa.",
  },
  {
    q: "¿Se encargan de la transferencia y la gestoría?",
    a: "Sí, acompañamos toda la operación: verificación, informes, transferencia y firma. Te evitamos las vueltas.",
  },
  {
    q: "¿Hacen envíos o venden al interior?",
    a: "Sí, coordinamos operaciones con compradores de otras localidades. Consultanos por WhatsApp y lo organizamos.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <span data-reveal className="section-pill">
            Preguntas frecuentes
          </span>
          <h2 data-reveal className="h-display mt-6 text-4xl sm:text-5xl">
            Todo lo que{" "}
            <span className="accent-serif text-5xl sm:text-6xl">
              necesitás saber
            </span>
          </h2>
          <p
            data-reveal
            className="mx-auto mt-5 max-w-2xl font-serif italic text-lg text-muted"
          >
            Permuta, consignación, revisión y gestoría. Si te queda una duda,
            escribinos.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => (
            <details
              key={f.q}
              data-reveal
              style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
              className="faq-item group rounded-xl border border-border bg-surface/80 backdrop-blur transition-colors hover:border-accent/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-sm font-semibold">
                {f.q}
                <span className="faq-plus text-xl leading-none text-accent">
                  +
                </span>
              </summary>
              <p className="px-6 pb-5 text-sm leading-relaxed text-muted">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
