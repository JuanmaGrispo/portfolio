"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Dialog } from "radix-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";

type GalleryImage = { src: string; alt: string };

export function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ mx: number; my: number; px: number; py: number } | null>(null);
  const didDragRef = useRef(false);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const prev = useCallback(() => {
    resetZoom();
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length, resetZoom]);

  const next = useCallback(() => {
    resetZoom();
    setIndex((i) => (i + 1) % images.length);
  }, [images.length, resetZoom]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, prev, next]);

  // Non-passive wheel listener (required to call preventDefault)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const rect = el!.getBoundingClientRect();
      const P = {
        x: e.clientX - (rect.left + rect.width / 2),
        y: e.clientY - (rect.top + rect.height / 2),
      };
      setZoom((z) => {
        const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
        const z2 = Math.min(4, Math.max(1, z * factor));
        if (z2 <= 1) {
          setPan({ x: 0, y: 0 });
          return 1;
        }
        const ratio = z2 / z;
        setPan((p) => ({
          x: P.x * (1 - ratio) + p.x * ratio,
          y: P.y * (1 - ratio) + p.y * ratio,
        }));
        return z2;
      });
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [open]);

  function openAt(i: number) {
    resetZoom();
    setIndex(i);
    setOpen(true);
  }

  // Click: toggle zoom centered on click point
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (didDragRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const P = {
      x: e.clientX - (rect.left + rect.width / 2),
      y: e.clientY - (rect.top + rect.height / 2),
    };
    if (zoom > 1) {
      resetZoom();
    } else {
      const z2 = 2.5;
      setPan({ x: P.x * (1 - z2), y: P.y * (1 - z2) });
      setZoom(z2);
    }
  }

  // Drag to pan
  function handleMouseDown(e: React.MouseEvent) {
    didDragRef.current = false;
    if (zoom <= 1) return;
    e.preventDefault();
    dragStartRef.current = { mx: e.clientX, my: e.clientY, px: pan.x, py: pan.y };
    setIsDragging(true);
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.mx;
    const dy = e.clientY - dragStartRef.current.my;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didDragRef.current = true;
    setPan({ x: dragStartRef.current.px + dx, y: dragStartRef.current.py + dy });
  }

  function stopDrag() {
    dragStartRef.current = null;
    setIsDragging(false);
  }

  const cursorClass =
    zoom > 1
      ? isDragging
        ? "cursor-grabbing"
        : "cursor-grab"
      : "cursor-zoom-in";

  return (
    <>
      {/* ── Thumbnail grid ── */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => openAt(i)}
            className={[
              "group relative overflow-hidden rounded-xl border border-border/60 bg-muted/20",
              "cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70",
              i === 0 ? "col-span-2 h-44 sm:h-52" : "h-32 sm:h-36",
            ].join(" ")}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
            <span className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/15" />
          </button>
        ))}
      </div>

      {/* ── Lightbox ── */}
      <Dialog.Root
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) resetZoom();
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 duration-150" />

          <Dialog.Content
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 outline-none"
            aria-describedby={undefined}
          >
            <Dialog.Title className="sr-only">
              {images[index]?.alt}
            </Dialog.Title>

            {/* Counter + zoom hint + close */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3 pointer-events-none">
              <div className="flex items-center gap-3">
                <span className="text-sm tabular-nums text-white/50">
                  {index + 1} / {images.length}
                </span>
                <span className="text-xs text-white/30">
                  {zoom > 1
                    ? `${zoom.toFixed(1)}×  ·  click para alejar`
                    : "click o scroll para hacer zoom"}
                </span>
              </div>
              <Dialog.Close className="pointer-events-auto rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20">
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
                <span className="sr-only">Cerrar</span>
              </Dialog.Close>
            </div>

            {/* Main image — zoom & pan area */}
            <div
              ref={containerRef}
              className={[
                "relative h-[65vh] w-full max-w-5xl overflow-hidden px-14 md:px-20 select-none",
                cursorClass,
              ].join(" ")}
              onClick={handleClick}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={stopDrag}
              onMouseLeave={stopDrag}
            >
              {images.map((img, i) => (
                <div
                  key={img.src}
                  style={
                    i === index
                      ? {
                          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                          transition: isDragging ? "none" : "transform 0.18s ease",
                        }
                      : undefined
                  }
                  className={[
                    "absolute inset-0 mx-14 md:mx-20",
                    i === index
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none",
                  ].join(" ")}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 1024px) 90vw, 900px"
                    priority={i === 0}
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            {/* Prev / Next — fade out when zoomed */}
            <button
              onClick={prev}
              className={[
                "absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-all duration-200 hover:bg-white/20",
                zoom > 1 ? "opacity-0 pointer-events-none" : "opacity-100",
              ].join(" ")}
              aria-label="Anterior"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
            </button>
            <button
              onClick={next}
              className={[
                "absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-all duration-200 hover:bg-white/20",
                zoom > 1 ? "opacity-0 pointer-events-none" : "opacity-100",
              ].join(" ")}
              aria-label="Siguiente"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
            </button>

            {/* Thumbnail strip */}
            <div
              className={[
                "flex gap-2 overflow-x-auto px-4 pb-2 transition-opacity duration-200",
                zoom > 1 ? "opacity-0 pointer-events-none" : "opacity-100",
              ].join(" ")}
            >
              {images.map((img, i) => (
                <button
                  key={img.src}
                  onClick={() => { resetZoom(); setIndex(i); }}
                  className={[
                    "relative h-12 w-20 shrink-0 overflow-hidden rounded-lg border transition-all duration-150",
                    i === index
                      ? "border-white/70 opacity-100 ring-1 ring-white/40"
                      : "border-white/15 opacity-40 hover:opacity-70",
                  ].join(" ")}
                  aria-label={img.alt}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
