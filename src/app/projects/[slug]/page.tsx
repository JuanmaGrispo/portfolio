import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProjectBySlug, getProjectSlugs } from "@/data/projects";

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
      <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-14 md:px-10 md:py-20">
        <nav aria-label="Migas" className="text-sm text-muted-foreground">
          <Link
            href="/#projects"
            className="transition-colors hover:text-foreground"
          >
            ← Volver a proyectos
          </Link>
        </nav>

        <article className="mt-10 md:mt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Proyecto
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
            {project.summary}
          </p>

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

          <div className="mt-12 space-y-5 border-t border-border/80 pt-10 leading-relaxed text-muted-foreground">
            {project.description.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

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
