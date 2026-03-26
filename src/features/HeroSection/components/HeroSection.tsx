import HeroActions from "@/features/HeroSection/components/HeroActions";

const HERO_SKILLS = [
  "APIs",
  "Sistemas",
  "Web",
  "Integraciones",
] as const;

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100dvh-5rem)] flex-col justify-center overflow-x-hidden border-b border-border/40 py-24 md:py-32"
    >
      {/* Viñeta violeta sutil (no tapa el grid del fondo global) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-90"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 85% 55% at 50% -5%, rgba(167, 139, 250, 0.09), transparent 58%), radial-gradient(ellipse 60% 40% at 85% 40%, rgba(129, 140, 248, 0.05), transparent 52%)",
        }}
      />

      <div
        className="pointer-events-none absolute -left-28 top-12 z-0 h-88 w-88 rounded-full bg-primary/10 blur-[88px] md:h-104 md:w-104"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-36 z-0 h-56 w-56 rounded-full bg-[#818cf8]/8 blur-[80px] md:h-64 md:w-64"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-28 left-1/4 z-0 h-36 w-36 rounded-full bg-palette-accent/8 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 text-center sm:px-8 md:px-10">
        <header>
          <p className="animate-fade-up text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted-foreground/90 md:text-xs">
            Juan Manuel Grispo
          </p>
          <h1
            className="animate-fade-up animate-delay-100 font-hero mt-6 overflow-visible text-balance text-[2.25rem] font-bold leading-[1.08] tracking-[-0.02em] text-foreground antialiased sm:text-5xl sm:leading-[1.04] md:mt-9 md:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem]"
          >
            Transformo ideas en{" "}
            <span className="text-primary">productos</span> que funcionan
          </h1>
        </header>

        <div className="animate-fade-up animate-delay-200 mt-5 space-y-2 text-pretty md:mt-7">
          <div className="mx-auto max-w-2xl space-y-2">
          <p className="text-[1.05rem] leading-relaxed text-muted-foreground sm:text-lg">
            ¿Tenés una idea o un problema?{" "}
            <span className="text-foreground/95">
              No hace falta que sepas cómo hacerlo.
            </span>
          </p>
          <p className="text-[1.05rem] font-semibold leading-relaxed text-foreground/90 sm:text-lg">
            Lo bajo a tierra, lo construyo y lo hago funcionar.
          </p>
          </div>
        </div>

        <div className="animate-fade-up animate-delay-300 flex justify-center">
          <HeroActions />
        </div>

        <p
          className="animate-fade-up animate-delay-400 mt-8 text-xs text-muted-foreground/65 sm:text-sm md:mt-10 md:text-xs"
          aria-label="Especialidades"
        >
          {HERO_SKILLS.map((label, i) => (
            <span key={label}>
              {i > 0 ? (
                <span
                  aria-hidden
                  className="mx-2 text-muted-foreground/45 md:mx-3"
                >
                  ·
                </span>
              ) : null}
              {label}
            </span>
          ))}
        </p>
      </div>

      {/* Indicador decorativo: invita a scrollear (no interactivo) */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 md:bottom-8"
        aria-hidden
      >
        <div className="hero-scroll-hint flex justify-center">
          <svg
            className="size-5 text-muted-foreground/60 md:size-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
