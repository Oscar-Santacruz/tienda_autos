"use client";

import { useEffect, useRef, useState } from "react";

// Intro de marca: miles de partículas doradas convergen hasta formar el logo
// (corona + "PRESTIGE MOTORS"), brillan un instante y la cortina se desvanece
// revelando el hero. Un click/tecla la saltea. Con prefers-reduced-motion no
// se ejecuta. Al terminar agrega `intro-done` a <html>, que dispara la
// entrada escalonada del hero (ver globals.css).

const CROWN_PATH =
  "M2 8l4 3 6-7 6 7 4-3-2 11H4L2 8zm2.6 9.5h14.8l.28-1.5H4.32l.28 1.5z";

const CONVERGE = 1900; // ms que tardan las partículas en formar el logo
const HOLD = 1000; // ms con el logo formado (brillo)
const FADE = 700; // ms del fade-out de la cortina

export function IntroParticles() {
  const [done, setDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let finished = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const finish = () => {
      if (finished) return;
      finished = true;
      document.documentElement.classList.add("intro-done");
      setDone(true);
    };

    const startFade = () => {
      overlayRef.current?.classList.add("opacity-0", "pointer-events-none");
    };

    const skip = () => {
      startFade();
      timers.push(setTimeout(finish, 350));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      finish();
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    // 1) Dibujar el logo en un canvas oculto para muestrear sus píxeles.
    const off = document.createElement("canvas");
    off.width = W;
    off.height = H;
    const octx = off.getContext("2d");
    if (!octx) {
      finish();
      return;
    }

    const cx = W / 2;
    const crownSize = Math.min(W, H) * (W < 640 ? 0.3 : 0.2);
    const crownY = H * 0.34;

    octx.fillStyle = "#d4af37";
    octx.save();
    octx.translate(cx - crownSize / 2, crownY - crownSize / 2);
    octx.scale(crownSize / 24, crownSize / 24);
    octx.fill(new Path2D(CROWN_PATH));
    octx.restore();

    const nameSize = Math.min(W * 0.068, 64);
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    try {
      // Soportado en Chromium; en otros browsers simplemente se ignora.
      (octx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
        `${Math.round(nameSize * 0.1)}px`;
    } catch {}
    octx.fillStyle = "#f4eedd";
    octx.font = `700 ${nameSize}px ui-sans-serif, system-ui, sans-serif`;
    octx.fillText("PRESTIGE MOTORS", cx, crownY + crownSize * 0.78);

    const subSize = Math.max(nameSize * 0.32, 15);
    octx.fillStyle = "#d4af37";
    octx.font = `700 ${subSize}px ui-sans-serif, system-ui, sans-serif`;
    try {
      (octx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
        `${Math.round(subSize * 0.5)}px`;
    } catch {}
    octx.fillText("AUTOMÓVILES", cx, crownY + crownSize * 0.78 + nameSize * 1.05);

    // 2) Muestrear píxeles → posiciones objetivo de las partículas.
    const img = octx.getImageData(0, 0, W, H).data;
    type Particle = {
      x: number;
      y: number;
      tx: number;
      ty: number;
      r: number;
      g: number;
      b: number;
      size: number;
      delay: number;
      tw: number;
    };
    const raw: { x: number; y: number; r: number; g: number; b: number }[] = [];
    const step = W < 640 ? 3 : 3;
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        const i = (y * W + x) * 4;
        if (img[i + 3] > 140) {
          raw.push({ x, y, r: img[i], g: img[i + 1], b: img[i + 2] });
        }
      }
    }
    const MAX_PARTICLES = 3200;
    const keepRatio = raw.length > MAX_PARTICLES ? MAX_PARTICLES / raw.length : 1;
    const particles: Particle[] = [];
    for (const q of raw) {
      if (Math.random() > keepRatio) continue;
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        tx: q.x,
        ty: q.y,
        r: q.r,
        g: q.g,
        b: q.b,
        size: Math.random() * 1.5 + 0.9,
        delay: Math.random() * 450,
        tw: Math.random() * Math.PI * 2,
      });
    }
    if (particles.length === 0) {
      finish();
      return;
    }

    // 3) Animar: dispersas → convergen (ease-out) → brillo → fade de cortina.
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const start = performance.now();
    let fadeStarted = false;

    const frame = (now: number) => {
      const t = now - start;
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        let px: number;
        let py: number;
        let alpha: number;
        if (t < p.delay) {
          px = p.x;
          py = p.y;
          alpha = 0.25;
        } else if (t < p.delay + CONVERGE) {
          const k = easeOut((t - p.delay) / CONVERGE);
          px = p.x + (p.tx - p.x) * k;
          py = p.y + (p.ty - p.y) * k;
          alpha = 0.25 + 0.75 * k;
        } else {
          px = p.tx;
          py = p.ty;
          alpha = 0.82 + 0.18 * Math.sin(p.tw + t / 130);
        }
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`;
        ctx.fillRect(px, py, p.size, p.size);
      }
      ctx.globalAlpha = 1;

      if (t > CONVERGE + HOLD && !fadeStarted) {
        fadeStarted = true;
        startFade();
        timers.push(setTimeout(finish, FADE));
      }
      if (!finished) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="intro-overlay fixed inset-0 z-[100] bg-[#070707] transition-opacity duration-700 ease-out"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
