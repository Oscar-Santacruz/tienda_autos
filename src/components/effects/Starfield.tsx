"use client";

import { useEffect, useRef } from "react";

// Fondo estrellado de página completa (estilo Sote): puntitos dorados/blancos
// fijos al viewport que titilan y derivan muy lento hacia arriba. Va detrás
// de todo el contenido (ver layout: canvas fijo + contenido en z-10).

const COUNT = 90;

export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let W = 0;
    let H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Star = {
      x: number;
      y: number;
      v: number;
      size: number;
      tw: number;
      a: number;
      gold: boolean;
    };
    let stars: Star[] = [];

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        v: 0.02 + Math.random() * 0.12,
        size: Math.random() * 1.7 + 0.5,
        tw: Math.random() * Math.PI * 2,
        a: 0.1 + Math.random() * 0.35,
        gold: Math.random() < 0.45,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const frame = (now: number) => {
      ctx.clearRect(0, 0, W, H);
      for (const s of stars) {
        s.y -= s.v;
        if (s.y < -4) {
          s.y = H + 4;
          s.x = Math.random() * W;
        }
        ctx.globalAlpha = s.a * (0.5 + 0.5 * Math.sin(s.tw + now / 1100));
        ctx.fillStyle = s.gold ? "#d4af37" : "#e8e8e8";
        ctx.fillRect(s.x, s.y, s.size, s.size);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
