import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { IntroParticles } from "@/components/effects/IntroParticles";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Starfield } from "@/components/effects/Starfield";
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
    <html lang="es" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        {/* Marca <html> con .js antes del primer paint: los estados iniciales
            ocultos de los reveals solo aplican si hay JS (ver globals.css). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <IntroParticles />
        {/* Estrellas de fondo en toda la página; el contenido va en z-10 */}
        <Starfield />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <WhatsAppButton />
        <CustomCursor />
        <ScrollReveal />
      </body>
    </html>
  );
}
