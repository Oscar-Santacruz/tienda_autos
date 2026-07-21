// Config de marca y contacto. Cambiar acá para re-brandear todo el sitio.

export const site = {
  name: "Prestige Motors",
  tagline: "Tu próximo vehículo, con la confianza que merecés.",
  description:
    "Venta de vehículos 0km y usados de todas las marcas en Formosa. " +
    "Tomamos consignaciones y te acompañamos en cada paso de la compra.",
  stats: {
    followers: "34 mil",
    brands: "Todas las marcas",
    city: "Formosa, Argentina",
    // Datos de social proof mostrados en header y reseñas. Editar con los
    // valores reales del negocio.
    monthlyVisits: "2.850",
    rating: "4.9",
    reviews: "+120",
  },
  contact: {
    // WhatsApp principal (formato internacional para wa.me).
    whatsapp: "3704 83-5319",
    whatsappUrl: "https://wa.me/5493704835319",
    // Líneas de ventas.
    phones: ["3704-835319", "3704-988845"],
    email: "" as string,
    address: "España 1085, Formosa, Argentina (3600)",
    hours: "Lun a Vie 8:00–12:30 y 16:30–20:30 · Sáb 8:30–12:30",
    instagram: "@prestige_motorsfsa",
    instagramUrl: "https://instagram.com/prestige_motorsfsa",
    website: "prestigemotors.com.ar",
    websiteUrl: "https://prestigemotors.com.ar",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Espa%C3%B1a+1085%2C+Formosa%2C+Argentina",
    googleReviewsUrl:
      "https://www.google.com/maps/search/?api=1&query=Prestige+Motors+Formosa",
  },
  // Horarios para el estado Abierto/Cerrado del header (hora de Argentina,
  // UTC-3). day: 0=domingo … 6=sábado; rangos [desde, hasta] en horas.
  openingHours: {
    1: [[8, 12.5], [16.5, 20.5]],
    2: [[8, 12.5], [16.5, 20.5]],
    3: [[8, 12.5], [16.5, 20.5]],
    4: [[8, 12.5], [16.5, 20.5]],
    5: [[8, 12.5], [16.5, 20.5]],
    6: [[8.5, 12.5]],
  } as Record<number, [number, number][]>,
  nav: [
    { label: "Historia", href: "#historia" },
    { label: "Unidades", href: "#unidades" },
    { label: "Stock", href: "#stock" },
    { label: "Reseñas", href: "#resenas" },
    { label: "Consignar", href: "#consignar" },
    { label: "Servicios", href: "#servicios" },
    { label: "FAQ", href: "#faq" },
    { label: "Ubicación", href: "#ubicacion" },
  ],
} as const;
