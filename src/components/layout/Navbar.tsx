"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { scrollToSection } from "@/lib/scrollToSection";

/** Mismo orden que en `page.tsx`: Experiencia → … → Proyectos → Servicios → Contacto */
const NAV_ITEMS = [
  { id: "experience", label: "Experiencia" },
  { id: "projects", label: "Proyectos" },
  { id: "what-i-build", label: "Servicios" },
  { id: "contact", label: "Contacto" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function handleNavClick(id: string, e: React.MouseEvent<HTMLElement>) {
    setMenuOpen(false);
    scrollToSection(id, e);
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-300 ease-out",
          scrolled
            ? "border-white/8 bg-black/80 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Navegación principal"
          className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 md:px-6"
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection("hero", e)}
            className="text-sm font-semibold tracking-tight text-white/90 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            aria-label="Inicio"
          >
            <span className="md:hidden">Juan Manuel</span>
            <span className="hidden md:inline">Juan Manuel Grispo</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={(e) => scrollToSection(item.id, e)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-white/55 transition-colors hover:bg-white/8 hover:text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile: hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex size-9 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 md:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              {menuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </>
              )}
            </svg>
          </button>
        </nav>
      </header>

      {/**
       * Solo montar el overlay cuando está abierto: en iOS/Safari una capa
       * `fixed` + `inert` + opacidad 0 seguía en el hit-test y bloqueaba toques al header y al resto de la página.
       */}
      {menuOpen ? (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className={cn(
            "fixed inset-0 z-100 flex animate-in flex-col fade-in-0 zoom-in-95 duration-200 ease-out md:hidden",
            "bg-black/95 backdrop-blur-xl",
          )}
        >
          <div className="flex h-14 items-center justify-between border-b border-white/8 px-4">
            <span className="text-sm font-semibold text-white/90">
              Juan Manuel
            </span>
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setMenuOpen(false)}
              className="flex size-9 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={(e) => handleNavClick(item.id, e)}
                className="group flex w-full items-center justify-between rounded-xl px-4 py-4 text-left text-xl font-medium text-white/70 transition-colors hover:bg-white/6 hover:text-white active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                {item.label}
                <span
                  aria-hidden
                  className="text-white/25 transition-colors group-hover:text-white/50"
                >
                  →
                </span>
              </button>
            ))}
          </nav>

          <div className="px-6 pb-10">
            <a
              href="#contact"
              onClick={(e) => handleNavClick("contact", e)}
              className="flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-[0_0_24px_-6px_rgba(167,139,250,0.4)] transition-[transform,box-shadow] duration-200 hover:scale-[1.02] hover:shadow-[0_0_32px_-4px_rgba(167,139,250,0.5)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              Contame tu idea →
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
