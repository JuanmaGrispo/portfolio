export type ExperienceLogo = {
  src: string;
  alt: string;
};

export type ExperienceItem = {
  id: string;
  isCurrent?: boolean;
  periodLabel: string;
  dateTime: string;
  title: string;
  company: string;
  companyUrl?: string;
  productName?: string;
  productUrl?: string;
  logos?: ExperienceLogo[];
  /** Monogram en lugar de logos (ej. freelance). */
  monogram?: string;
  monogramTitle?: string;
  /** Ícono SVG nombrado para usar en lugar de monogram o logos. */
  icon?: "briefcase";
  /** Una línea visible en estado colapsado. */
  summaryLine: string;
  /** Párrafo introductorio al expandir. */
  description: string;
  bullets: string[];
  stackTags?: string[];
  impact?: string;
};

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: "freelance",
    isCurrent: true,
    periodLabel: "2025 — presente",
    dateTime: "2025-01",
    title: "Construyo productos completos desde una necesidad hasta algo funcionando.",
    company: "Proyectos a medida",
    icon: "briefcase",
    summaryLine:
      "Tomo una idea o un problema y lo llevo hasta un producto real en producción.",
    description:
      "Trabajo de forma independiente construyendo soluciones completas. Entiendo la necesidad, defino la solución y la ejecuto de principio a fin.",
    bullets: [
      "Definición de la solución según el problema real",
      "Desarrollo completo: frontend, backend e integraciones",
      "Conexión con servicios externos (CRMs, APIs, wallets)",
      "Deploy y puesta en funcionamiento",
    ],
    stackTags: ["Next.js", "Nest.js", "TypeScript", "MongoDB", "REST"],
    impact:
      "Productos funcionando con integraciones reales para clientes internacionales.",
  },
  {
    id: "secdevs",
    periodLabel: "Sep 2023 — Dic 2024",
    dateTime: "2023-09",
    title: "Desarrollador de software",
    company: "Secdevs",
    companyUrl: "https://secdevs.com.ar/",
    productName: "Tasky",
    productUrl: "https://go.tasky.digital/",
    logos: [
      { src: "https://secdevs.com.ar/favicon.ico", alt: "Secdevs" },
      { src: "https://go.tasky.digital/favicon.ico", alt: "Tasky" },
    ],
    summaryLine:
      "Desarrollo de software en una agencia digital: sistemas a medida, apps web y Android nativo.",
    description:
      "Secdevs es una agencia que ayuda a sus clientes a crecer en el mundo digital: diseño web, aplicaciones móviles, sistemas a medida e imagen de marca. Formé parte del área de desarrollo de software, donde mi aporte principal fue en Tasky —un producto propio de la empresa— junto a otros proyectos independientes.",
    bullets: [
      "Participé en el diseño funcional y backend de Tasky, plataforma de gestión académica integral usada por instituciones educativas",
      "Diseñé APIs, modelos de datos y lógica de negocio para módulos como comunicaciones, calificaciones, asistencia, legajos y más",
      "Desarrollé webapps a medida para clientes de la agencia",
      "Construí una aplicación en Android nativo como parte de un proyecto independiente",
    ],
    stackTags: ["Node.js", "Express", "MySQL", "ORM", "Android", "REST"],
    impact:
      "Producto real en uso día a día por instituciones educativas, con backend diseñado para escalar con ellas.",
  },
];
