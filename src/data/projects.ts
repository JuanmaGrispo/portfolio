export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  /** Párrafos sueltos; editás este array con tu caso real. */
  description: string[];
  tags: string[];
  links?: ProjectLink[];
};

const projects: Project[] = [
  {
    slug: "portfolio",
    title: "Este portfolio",
    summary:
      "Sitio personal con Next.js, TypeScript y Tailwind: secciones claras, proyectos con rutas dinámicas y un stack que podés extender sin drama.",
    description: [
      "La idea es tener una URL propia, buen rendimiento en mobile y un lugar donde mostrar experiencia y trabajo con buen SEO básico.",
      "El contenido de cada proyecto vive en un solo archivo de datos; sumar un caso nuevo es copiar un bloque y ajustar texto y links.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: [
      { label: "Código", href: "https://github.com" },
    ],
  },
  {
    slug: "ejemplo-api",
    title: "API y producto de ejemplo",
    summary:
      "Placeholder para un backend, integración o producto que quieras destacar: reemplazá el copy y los links por tu caso real.",
    description: [
      "Acá podés contar el problema, tu rol, el stack, integraciones (APIs, colas, base de datos) y el resultado medible si lo hay.",
    ],
    tags: ["Node.js", "API REST"],
    links: [
      { label: "Demo", href: "https://example.com" },
    ],
  },
];

export function getProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
