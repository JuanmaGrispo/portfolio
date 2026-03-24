import Link from "next/link";

import { getProjects } from "@/data/projects";

export default function ProjectsSection() {
  const projects = getProjects();

  return (
    <section
      id="projects"
      className="min-h-screen border-t border-border py-24 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col px-6 md:px-10">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Selección
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            Proyectos
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Trabajos y experimentos con contexto técnico y enlaces. Cada tarjeta
            abre una vista con el detalle completo.
          </p>
        </header>

        <ul className="mt-14 grid flex-1 list-none gap-6 sm:grid-cols-2 sm:gap-8 lg:mt-16">
          {projects.map((project, index) => (
            <li key={project.slug} className="flex min-h-0 sm:min-h-80">
              <Link
                href={`/projects/${project.slug}`}
                className="group flex w-full flex-col rounded-2xl border border-border/90 bg-linear-to-b from-card/55 to-card/15 p-7 shadow-sm outline-none ring-offset-background transition-[border-color,box-shadow,background-color] hover:border-primary/35 hover:shadow-[0_0_0_1px_rgba(167,139,250,0.12),0_20px_50px_-24px_rgba(0,0,0,0.45)] focus-visible:ring-2 focus-visible:ring-ring md:p-8"
              >
                <span className="text-[0.65rem] font-mono tabular-nums text-muted-foreground/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary md:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                  {project.summary}
                </p>
                {project.tags.length > 0 ? (
                  <ul
                    className="mt-6 flex flex-wrap gap-2"
                    aria-label="Tecnologías"
                  >
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary md:text-sm"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-0.5">
                  Ver caso completo
                  <span aria-hidden className="text-base leading-none">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
