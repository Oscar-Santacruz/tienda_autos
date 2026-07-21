import { site } from "@/lib/site";

// Pill flotante "Chat online" (estilo Sote) que abre WhatsApp.
export function WhatsAppButton() {
  return (
    <a
      href={site.contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat online por WhatsApp"
      className="gold-pulse fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full bg-accent px-5 py-3.5 text-sm font-bold text-black shadow-lg transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
        <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM8 11a1.25 1.25 0 1 1 0-2.5A1.25 1.25 0 0 1 8 11zm4 0a1.25 1.25 0 1 1 0-2.5A1.25 1.25 0 0 1 12 11zm4 0a1.25 1.25 0 1 1 0-2.5A1.25 1.25 0 0 1 16 11z" />
      </svg>
      Chat online
    </a>
  );
}
