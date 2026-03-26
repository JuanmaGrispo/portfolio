export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectRole = "Fullstack" | "Backend" | "Frontend";

export type Project = {
  slug: string;
  title: string;
  /** Indica el área de responsabilidad en el proyecto */
  role?: ProjectRole;
  /** Una línea para la card del grid */
  summary: string;
  /** Párrafos para la página de detalle */
  description: string[];
  tags: string[];
  links?: ProjectLink[];
  /** Imagen de portada para la card (ruta relativa a /public) */
  coverImage?: string;
  /** Galería de capturas para la página de detalle */
  images?: { src: string; alt: string }[];
  /** Clientes o empresas que usaron el proyecto */
  clients?: string[];
};

const projects: Project[] = [
  {
    slug: "tasky",
    title: "Tasky",
    role: "Backend",
    summary:
      "Plataforma de gestión académica integral que unifica en un solo ecosistema digital las comunicaciones, calificaciones, asistencia, legajos, boletines y más de instituciones educativas.",
    description: [
      "Las instituciones educativas suelen operar con herramientas fragmentadas: una app para comunicados, otra para notas, otra para pagos, ninguna conectada entre sí. Tasky nació para resolver eso: un ecosistema digital unificado que conecta a docentes, alumnos y familias en una sola plataforma.",
      "Participé en el diseño funcional y el desarrollo backend de múltiples módulos del sistema junto al equipo de Secdevs. El trabajo incluyó el modelado de entidades, el diseño de flujos de negocio y la construcción de las APIs que alimentan cada funcionalidad. Usamos StarUML para documentar diagramas de clases y flujos antes de implementar, lo que permitió iterar sobre el diseño sin romper lo ya construido.",
      "Los módulos en los que participé abarcan: comunicaciones, calificaciones, asistencia, integración con Google, legajos de alumnos, materias adeudadas y previas, mesas de examen, boletines/libretas/informes, estadísticas e indicadores, calendario, planes de estudio, cursos, personal docente, familias y actas psicopedagógicas.",
      "El stack se apoyó en Node.js con Express para la capa de API y MySQL con ORM para mantener el modelo de datos consistente con migraciones controladas. Tasky terminó siendo un producto real adoptado por instituciones educativas, con operaciones diarias corriendo sobre esta arquitectura.",
    ],
    tags: ["Node.js", "Express", "MySQL", "ORM", "StarUML", "REST API"],
    links: [{ label: "Ver plataforma →", href: "https://go.tasky.digital/" }],
    clients: ["Secdevs"],
    coverImage: "/tasky-1.png",
    images: [
      { src: "/tasky-1.png", alt: "Vista general de Tasky" },
      { src: "/tasky-2.jpg", alt: "Módulos de gestión académica" },
      { src: "/tasky-3.jpg", alt: "Panel de la plataforma" },
    ],
  },
  {
    slug: "zephyr-dashboard",
    title: "Zephyr Dashboard",
    role: "Fullstack",
    summary:
      "Plataforma que conecta sistemas y automatiza procesos entre empresas. Usada por clientes internacionales para sincronizar eventos, CRMs y más.",
    description: [
      "Zephyr Dashboard es una plataforma de integraciones construida desde cero para conectar Swoogo —un software de gestión de eventos— con los CRMs y APIs que cada cliente ya utiliza. El resultado: automatización completa del flujo de datos entre el registro de un asistente y los sistemas de la empresa.",
      "Diseñé e implementé más de 5 integraciones independientes, cada una adaptada al stack del cliente. El backend en NestJS expone una API modular que orquesta las llamadas entre sistemas, maneja webhooks, transforma datos y persiste el estado en PostgreSQL. El frontend en Svelte ofrece un dashboard de control donde los administradores pueden monitorear sincronizaciones, ver logs y gestionar configuraciones por cliente.",
      "Entre las integraciones más complejas se destacan la emisión de entradas y acreditaciones para eventos en Google Wallet y Apple Wallet, la sincronización bidireccional de contactos y registros con Salesforce y HubSpot, y la conexión con NetForum para gestión de membresías.",
      "Trabajé directamente con clientes como Dufour, Virgin Media UK, ColorInTech, ATS, Goldhouse y Creative Group, adaptando cada integración a sus procesos y CRMs específicos. Cada deployment fue independiente y productivo.",
    ],
    tags: [
      "Svelte",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Salesforce",
      "HubSpot",
      "Google Wallet",
      "Apple Wallet",
      "REST APIs",
      "Webhooks",
    ],
    clients: [
      "Dufour",
      "Virgin Media UK",
      "ColorInTech",
      "ATS",
      "Goldhouse",
      "Creative Group",
    ],
    coverImage: "/zephyr_dashboard_1.png",
    images: [
      { src: "/zephyr_dashboard_1.png", alt: "Dashboard principal de Zephyr" },
      { src: "/zephyr_dashboard_2.png", alt: "Vista de integraciones activas" },
      { src: "/zephyr_dashboard_3.png", alt: "Panel de configuración por cliente" },
    ],
  },
  {
    slug: "hca-business-test",
    title: "HCA Business Test Platform",
    role: "Fullstack",
    summary:
      "Plataforma de diagnóstico empresarial para HCA Argentina: test de 100 preguntas con análisis por dimensiones, gráfico de resultados descargable y panel administrativo para gestionar tests y leads.",
    description: [
      "HCA Argentina —Hubbard College of Administration— se acercó con una necesidad concreta: digitalizar su diagnóstico empresarial, un cuestionario de 100 preguntas que mide la salud organizacional de una empresa a lo largo de múltiples dimensiones estratégicas. El resultado debía ser claro, profesional y exportable.",
      "Diseñé e implementé una plataforma end-to-end con Next.js en el frontend público y SvelteKit en el panel administrativo, con una base de datos PostgreSQL compartida. El flujo del test guía al usuario pregunta por pregunta con navegación por grupos, registra cada respuesta y —al finalizar— genera un Business Analysis Chart: un gráfico de líneas con puntajes por dimensión que puede descargarse como PDF.",
      "Pensando en el largo plazo, propuse ir más allá de un test estático. El admin dashboard permite crear tests desde cero, definir dimensiones, cargar preguntas y asignar cada una con su ponderación. Cada intento queda registrado junto a los datos de la empresa y el responsable, dándole a HCA una base de leads estructurada para hacer seguimiento y ofrecer su servicio de consultoría.",
      "El sistema quedó preparado para escalar: lanzar un nuevo cuestionario es cuestión de minutos desde el panel, sin tocar una sola línea de código.",
    ],
    tags: ["Next.js", "Nest.js", "PostgreSQL", "TypeScript", "PDF Generation"],
    clients: ["HCA Argentina"],
    coverImage: "/hca-1.png",
    images: [
      { src: "/hca-1.png", alt: "Landing page del Test Empresarial" },
      { src: "/hca-2.png", alt: "Flujo del cuestionario de 100 preguntas" },
      { src: "/hca-6.png", alt: "Resultados con Business Analysis Chart por dimensión" },
      { src: "/hca-3.png", alt: "Panel administrativo — listado de tests" },
      { src: "/hca-5.png", alt: "Editor de test con dimensiones y preguntas" },
      { src: "/hca-4.png", alt: "Login del panel de administración" },
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
