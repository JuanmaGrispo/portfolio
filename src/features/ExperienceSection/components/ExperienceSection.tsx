import ExperienceList from "./ExperienceList";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="border-t border-border py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 md:px-10">
        <header className="max-w-2xl">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted-foreground md:text-xs">
            01 — Experiencia
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            Experiencia construyendo productos reales
          </h2>
        </header>

        <ExperienceList />
      </div>
    </section>
  );
}
