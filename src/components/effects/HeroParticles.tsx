"use client";

import { useEffect, useRef } from "react";

// Partículas doradas ambientales flotando en el fondo del hero (continuidad
// visual con la intro). Muy sutiles: derivan hacia arriba y titilan.

const COUNT = 55;

export function HeroParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    let W = 0;
    let H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; v: number; size: number; tw: number; a: number };
    let parts: P[] = [];

    const resize = () => {
      W = parent.clientWidth;
      H = parent.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = Array.from({ length: COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        v: 0.08 + Math.random() * 0.25,
        size: Math.random() * 1.8 + 0.6,
        tw: Math.random() * Math.PI * 2,
        a: 0.15 + Math.random() * 0.4,
      }));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    let raf = 0;
    const frame = (now: number) => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#d4af37";
      for (const p of parts) {
        p.y -= p.v;
        if (p.y < -4) {
          p.y = H + 4;
          p.x = Math.random() * W;
        }
        ctx.globalAlpha = p.a * (0.55 + 0.45 * Math.sin(p.tw + now / 900));
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
