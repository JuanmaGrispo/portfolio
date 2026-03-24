"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Linterna muy suave: solo añade un poco de luz bajo el cursor (CSS + vars).
 * Sin dependencias: librerías tipo Motion suman bundle y suelen implicar más trabajo en CPU.
 * Recursos: un listener + como máximo un rAF por frame (no bucle infinito).
 */
export function CursorFlashlight() {
  const [active, setActive] = useState(false);
  const pending = useRef(false);
  const x = useRef(0);
  const y = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setActive(fine.matches && !reduced.matches);
    };

    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!active) return;

    const root = document.documentElement;

    const onMove = (e: MouseEvent) => {
      x.current = e.clientX;
      y.current = e.clientY;
      if (pending.current) return;
      pending.current = true;
      requestAnimationFrame(() => {
        pending.current = false;
        root.style.setProperty("--cursor-x", `${x.current}px`);
        root.style.setProperty("--cursor-y", `${y.current}px`);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 cursor-flashlight-bg"
      aria-hidden
    />
  );
}
