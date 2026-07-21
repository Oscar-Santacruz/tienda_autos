"use client";

import { useEffect, useRef } from "react";

// Video de fondo del hero. Algunos navegadores pausan el autoplay aunque el
// video esté muteado (ahorro de energía, data saver); el efecto reintenta
// play() y, si el navegador lo bloquea igual, queda el poster como fondo.
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    ref.current?.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/hero-poster.jpg"
      src="/hero.mp4"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
