"use client";

import { useEffect } from "react";

// Cursor con diseño propio: un punto dorado que sigue al mouse al instante y
// un anillo que lo persigue con retardo suave. Sobre elementos interactivos el
// anillo se agranda y se tiñe. Solo en dispositivos con puntero fino y sin
// prefers-reduced-motion. El cursor nativo se oculta vía CSS
// (html.has-custom-cursor en globals.css).

const INTERACTIVE =
  "a, button, [role='button'], select, input, textarea, label, article";

export function CustomCursor() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.append(dot, ring);

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let pressed = false;
    let visible = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        rx = mx;
        ry = my;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      const target = e.target as Element | null;
      root.classList.toggle("cursor-hover", !!target?.closest?.(INTERACTIVE));
    };
    const onDown = () => {
      pressed = true;
    };
    const onUp = () => {
      pressed = false;
    };
    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) scale(${pressed ? 0.8 : 1})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      dot.remove();
      ring.remove();
      root.classList.remove("has-custom-cursor", "cursor-hover");
    };
  }, []);

  return null;
}
