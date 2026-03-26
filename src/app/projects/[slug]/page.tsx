import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProjectBySlug, getProjectSlugs, type ProjectRole } from "@/data/projects";

const ROLE_STYLES: Record<ProjectRole, string> = {
  Fullstack: "border-primary/40 bg-primary/10 text-primary",
  Backend: "border-amber-400/40 bg-amber-400/10 text-amber-400",
  Frontend: "border-sky-400/40 bg-sky-400/10 text-sky-400",
};
import { ProjectGallery } from "@/components/ui/ProjectGallery";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Proyecto" };
  }
  return {
    title: `${project.title} · Portfolio`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex min-h-dvh flex-col">
      {/* Hero de portada */}
      {project.coverImage ? (
        <div className="relative h-64 w-full overflow-hidden bg-muted/30 sm:h-80 md:h-96">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
        </div>
      ) : null}

      <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-10 md:px-10 md:py-16">
        <nav aria-label="Migas" className="text-sm text-muted-foreground">
          <Link
            href="/#projects"
            className="transition-colors hover:text-foreground"
          >
            ← Volver a proyectos
          </Link>
        </nav>

        <article className="mt-10 md:mt-12">
          <div className="flex items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Proyecto
            </p>
            {project.role ? (
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide ${ROLE_STYLES[project.role]}`}
              >
                {project.role}
              </span>
            ) : null}
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
            {project.summary}
          </p>

          {/* Stack tecnológico */}
          {project.tags.length > 0 ? (
            <ul
              className="mt-8 flex flex-wrap gap-2"
              aria-label="Tecnologías y temas"
            >
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          {/* Clientes */}
          {project.clients && project.clients.length > 0 ? (
            <div className="mt-10 rounded-xl border border-border/60 bg-card/30 px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Clientes
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
                {project.clients.map((client) => (
                  <li
                    key={client}
                    className="text-sm font-medium text-foreground"
                  >
                    {client}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Descripción */}
          <div className="mt-12 space-y-5 border-t border-border/60 pt-10 text-base leading-relaxed text-muted-foreground">
            {project.description.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Galería */}
          {project.images && project.images.length > 0 ? (
            <div className="mt-14">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Capturas
              </p>
              <ProjectGallery images={project.images} />
            </div>
          ) : null}

          {/* Links externos */}
          {project.links && project.links.length > 0 ? (
            <ul className="mt-12 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/45 hover:bg-muted/40"
                  >
                    {link.label}
                    <span className="sr-only">
                      {" "}
                      (se abre en una pestaña nueva)
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      </div>
    </main>
  );
}
