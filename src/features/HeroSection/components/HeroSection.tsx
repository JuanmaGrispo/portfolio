import { cn } from "@/lib/utils";

const HERO_TIMELINE = [
  { id: "relevamiento", label: "Relevamiento" },
  { id: "desarrollo", label: "Desarrollo" },
  { id: "entrega", label: "Entrega" },
] as const;

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100dvh-5rem)] flex-col justify-center overflow-hidden border-b border-border/40 py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute -left-28 top-12 h-88 w-88 rounded-full bg-primary/10 blur-[88px] md:h-104 md:w-104"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-36 h-56 w-56 rounded-full bg-[#818cf8]/8 blur-[80px] md:h-64 md:w-64"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-28 left-1/4 h-36 w-36 rounded-full bg-palette-accent/8 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
        <header className="max-w-2xl">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted-foreground md:text-xs">
            Juan Manuel Grispo — Full Stack Developer
          </p>
          <h1 className="mt-7 text-4xl font-semibold leading-[1.07] tracking-[-0.032em] text-balance sm:text-5xl md:mt-9 md:text-[2.75rem] md:leading-[1.06] lg:text-[3.25rem] lg:leading-[1.03]">
            <span className="text-foreground">Vos pensalo,</span>
            <br />
            <span className="text-primary">yo lo programo</span>
          </h1>
        </header>

        <p className="mt-8 max-w-prose text-[0.9375rem] leading-[1.65] text-pretty text-muted-foreground md:mt-10 md:text-base md:leading-relaxed">
          Full stack de extremo a extremo: APIs, integraciones, frontend y
          aplicaciones móviles, con foco en productos coherentes y entregas
          iterativas.
        </p>

        <div className="mt-10 max-w-md border-t border-border/35 pt-8 md:mt-12 md:pt-9">
          <ol
            className={cn(
              "relative mx-auto grid w-full list-none grid-cols-3 gap-0 p-0",
              /* Trazo único, continuo, detrás de los puntos (centro del dot ≈ 7px / 8px) */
              "before:pointer-events-none before:absolute before:inset-x-0 before:top-[7px] before:z-0 before:h-px before:bg-border/90 before:content-[''] md:before:top-2",
            )}
            aria-label="Fases del proceso: relevamiento, desarrollo y entrega"
          >
            {HERO_TIMELINE.map((step) => (
              <li
                key={step.id}
                className="relative z-10 flex min-w-0 flex-col items-center text-center"
              >
                <span
                  className="relative z-10 flex size-3.5 shrink-0 items-center justify-center rounded-full border-2 border-primary/60 bg-background shadow-[0_0_0_4px_var(--background)] md:size-4"
                  aria-hidden
                />
                <span className="mt-3 max-w-36 text-[0.6875rem] font-normal leading-snug text-muted-foreground md:max-w-none md:text-xs">
                  {step.label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
