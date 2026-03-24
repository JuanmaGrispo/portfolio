import { CursorFlashlight } from "@/components/effects/CursorFlashlight";

/**
 * Fondo de página: capa fija full-viewport (rejilla + líneas + linterna solo fondo).
 * La linterna va antes de la viñeta para que el encuadre oscuro siga leyendo bien.
 */
export function PageAnimatedBackground() {
  return (
    <div
      className="page-animated-bg-shell pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="page-bg-base absolute inset-0" />
      <div className="page-bg-grid absolute inset-0" />
      <div className="page-bg-diagonals absolute inset-0" />
      <div className="page-bg-shine absolute inset-0" />
      <CursorFlashlight />
      <div className="page-bg-vignette absolute inset-0" />
    </div>
  );
}
