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
  },
  contact: {
    // WhatsApp principal (formato internacional para wa.me).
    whatsapp: "3704 83-5319",
    whatsappUrl: "https://wa.me/5493704835319",
    // Líneas de ventas.
    phones: ["3704-835319", "3704-988845"],
    email: "" as string,
    address: "España 1085, Formosa, Argentina (3600)",
    hours: "Lunes a sábado",
    instagram: "@prestige_motorsfsa",
    instagramUrl: "https://instagram.com/prestige_motorsfsa",
    website: "prestigemotors.com.ar",
    websiteUrl: "https://prestigemotors.com.ar",
  },
  nav: [
    { label: "Stock", href: "#stock" },
    { label: "Nosotros", href: "#historia" },
    { label: "Consignar", href: "#consignar" },
    { label: "Reseñas", href: "#resenas" },
    { label: "Contacto", href: "#contacto" },
  ],
} as const;
