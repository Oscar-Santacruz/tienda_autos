// Config de marca y contacto. Cambiar acá para re-brandear todo el sitio.

export const site = {
  name: "Tienda Autos",
  tagline: "El arte de elegir tu próximo auto.",
  description:
    "Compra, venta y consignación de vehículos premium. Stock seleccionado, gestión incluida y atención al detalle.",
  stats: {
    years: 13,
    clients: "5000+",
    reviews: "750+",
    rating: "4.9",
  },
  contact: {
    whatsapp: "+595 981 000000",
    whatsappUrl: "https://wa.me/595981000000",
    email: "ventas@tiendaautos.com",
    address: "Av. Principal 1234, Asunción, Paraguay",
    hours: "Lun a Vie 9:00–19:00 · Sáb 9:00–13:00",
    instagram: "@tienda_autos",
    instagramUrl: "https://instagram.com/",
  },
  nav: [
    { label: "Historia", href: "#historia" },
    { label: "Stock", href: "#stock" },
    { label: "Consignar", href: "#consignar" },
    { label: "Reseñas", href: "#resenas" },
    { label: "Contacto", href: "#contacto" },
  ],
} as const;
