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
    title: "Desarrollador backend",
    company: "Secdevs",
    companyUrl: "https://secdevs.com.ar/",
    productName: "Tasky",
    productUrl: "https://go.tasky.digital/",
    logos: [
      { src: "https://secdevs.com.ar/favicon.ico", alt: "Secdevs" },
      { src: "https://go.tasky.digital/favicon.ico", alt: "Tasky" },
    ],
    summaryLine:
      "Construcción de sistemas backend sobre productos reales en instituciones.",
    description:
      "Trabajé en el desarrollo de múltiples soluciones, con foco principal en Tasky, una plataforma de gestión escolar utilizada por instituciones reales.",
    bullets: [
      "Diseñé APIs y modelos de datos para comunicación, asistencia y pagos",
      "Implementé lógica de negocio sobre flujos reales",
      "Construí sistemas preparados para crecer con las instituciones",
      "Apps web interactivas y Android nativo en proyectos independientes",
    ],
    stackTags: ["Node.js", "REST", "MongoDB", "Android"],
    impact:
      "Backend y producto usado día a día por escuelas: datos, comunicaciones y operaciones en un solo ecosistema.",
  },
];
