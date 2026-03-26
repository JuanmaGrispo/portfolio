import Image from "next/image";
import Link from "next/link";

import { getProjects, type ProjectRole } from "@/data/projects";

const ROLE_STYLES: Record<ProjectRole, string> = {
  Fullstack: "border-primary/40 bg-primary/10 text-primary",
  Backend: "border-amber-400/40 bg-amber-400/10 text-amber-400",
  Frontend: "border-sky-400/40 bg-sky-400/10 text-sky-400",
};

export default function ProjectsSection() {
  const projects = getProjects();

  return (
    <section
      id="projects"
      className="border-t border-border py-20 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col px-5 sm:px-8 md:px-10">
        <header className="max-w-2xl">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted-foreground md:text-xs">
            02 — Proyectos
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            Proyectos reales en uso
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Productos construidos para resolver problemas concretos.
          </p>
        </header>

        <ul className="mt-10 grid flex-1 list-none gap-6 sm:grid-cols-2 md:mt-14">
          {projects.map((project, index) => (
            <li key={project.slug} className="flex min-h-0 sm:min-h-80">
              <Link
                href={`/projects/${project.slug}`}
                className="group flex w-full flex-col overflow-hidden rounded-2xl border border-border/90 bg-linear-to-b from-card/55 to-card/15 shadow-sm outline-none ring-offset-background transition-[border-color,box-shadow,background-color] hover:border-primary/35 hover:shadow-[0_0_0_1px_rgba(167,139,250,0.12),0_20px_50px_-24px_rgba(0,0,0,0.45)] focus-visible:ring-2 focus-visible:ring-ring"
              >
                {project.coverImage ? (
                  <div className="relative h-44 w-full overflow-hidden bg-muted/30 sm:h-52">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover saturate-[0.75] transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                  </div>
                ) : null}

                <div className="flex flex-1 flex-col p-5 md:p-7">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[0.65rem] font-mono tabular-nums text-muted-foreground/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {project.role ? (
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide ${ROLE_STYLES[project.role]}`}
                      >
                        {project.role}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary md:text-xl">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 flex-1 line-clamp-3 text-pretty text-sm leading-relaxed text-muted-foreground md:line-clamp-none md:text-base">
                    {project.summary}
                  </p>
                  {project.tags.length > 0 ? (
                    <ul
                      className="mt-4 flex flex-wrap gap-1.5 md:mt-5 md:gap-2"
                      aria-label="Tecnologías"
                    >
                      {project.tags.slice(0, 3).map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[0.65rem] font-medium text-primary md:px-3 md:py-1 md:text-xs"
                        >
                          {tag}
                        </li>
                      ))}
                      {project.tags.length > 3 ? (
                        <li className="rounded-full border border-border/60 bg-muted/30 px-2.5 py-0.5 text-[0.65rem] font-medium text-muted-foreground md:px-3 md:py-1 md:text-xs">
                          +{project.tags.length - 3}
                        </li>
                      ) : null}
                    </ul>
                  ) : null}
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-0.5 md:mt-5">
                    Ver caso →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
