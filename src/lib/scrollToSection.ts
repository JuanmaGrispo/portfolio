import type { MouseEvent } from "react";

/**
 * Scroll a un elemento por id. Evita que el navegador actualice el hash en la URL
 * (preventDefault en clic normal). Respeta Cmd/Ctrl/clic y prefers-reduced-motion.
 */
export function scrollToSection(
  sectionId: string,
  e: MouseEvent<HTMLElement>,
) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  if (e.button !== 0) return;
  // Si es un <a>, evitamos que ensucie la URL con #hash.
  e.preventDefault?.();
  const el = document.getElementById(sectionId);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({
    behavior: reduced ? "auto" : "smooth",
    block: "start",
  });
}
