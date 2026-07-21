import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Dominios permitidos para next/image. Agregar acá el bucket de Supabase
    // Storage cuando se suban las fotos reales de los autos.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
