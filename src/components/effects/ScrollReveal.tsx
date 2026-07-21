"use client";

import { useEffect } from "react";

// Revela con fade + slide-up todo elemento con [data-reveal] al entrar al
// viewport (estado inicial oculto en globals.css, solo bajo html.js). Un
// MutationObserver re-observa los nodos nuevos — necesario porque el grid del
// stock se reemplaza al cambiar filtros (RSC).

export function ScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    const scan = (root: ParentNode) => {
      root
        .querySelectorAll?.("[data-reveal]:not(.is-revealed)")
        .forEach((el) => io.observe(el));
    };
    scan(document);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches?.("[data-reveal]")) io.observe(node);
          scan(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
