import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { IntroParticles } from "@/components/effects/IntroParticles";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} · ${site.tagline}`,
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {/* Marca <html> con .js antes del primer paint: los estados iniciales
            ocultos de los reveals solo aplican si hay JS (ver globals.css). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <IntroParticles />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CustomCursor />
        <ScrollReveal />
      </body>
    </html>
  );
}
