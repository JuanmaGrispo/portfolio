const ITEMS = [
  { label: "MVPs desde cero", icon: "🚀" },
  { label: "Apps web completas", icon: "🖥️" },
  { label: "Sistemas internos", icon: "🏢" },
  { label: "Integraciones", icon: "🔗" },
  { label: "Automatización", icon: "⚡" },
  { label: "Mejora de productos existentes", icon: "🛠️", emphasis: true },
] as const;

export default function WhatIBuildSection() {
  return (
    <section
      id="what-i-build"
      className="border-t border-border py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 md:px-10">
        <header className="max-w-2xl">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted-foreground md:text-xs">
            03 — Qué construyo
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            Qué puedo construir
          </h2>
        </header>

        <ul className="mt-10 grid list-none gap-3 p-0 sm:grid-cols-2 md:mt-12 md:gap-4">
          {ITEMS.map((item) => (
            <li
              key={item.label}
              className={[
                "flex items-center gap-4 rounded-xl border px-5 py-4 transition-colors duration-200",
                item.emphasis
                  ? "border-primary/45 bg-primary/10 hover:border-primary/55 hover:bg-primary/12 shadow-[0_0_0_1px_rgba(167,139,250,0.10)]"
                  : "border-border/60 bg-card/25 hover:border-primary/25 hover:bg-card/45",
              ].join(" ")}
            >
              <span
                className={[
                  "flex size-9 shrink-0 items-center justify-center rounded-lg text-base",
                  item.emphasis ? "bg-primary/20" : "bg-primary/10",
                ].join(" ")}
                aria-hidden
              >
                {item.icon}
              </span>
              <span
                className={[
                  "text-sm font-medium sm:text-base",
                  item.emphasis ? "text-foreground" : "text-foreground/85",
                ].join(" ")}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
