import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ExperienceItem = {
  id: string;
  /** Rol vigente: la línea brilla en ese tramo y el punto lleva glow. */
  isCurrent?: boolean;
  periodLabel: string;
  dateTime: string;
  title: string;
  company: string;
  companyUrl?: string;
  productName?: string;
  productUrl?: string;
  /** Logos opcionales (favicons de los sitios). */
  logos?: { src: string; alt: string }[];
  lead: ReactNode;
};

const EXPERIENCE: ExperienceItem[] = [
  {
    id: "freelance",
    isCurrent: true,
    periodLabel: "2025 — presente",
    dateTime: "2025-01",
    title: "Desarrollador freelance",
    company: "Proyectos a medida",
    lead: (
      <>
        <p>
          Trabajo con equipos y productos que necesitan unificar datos y procesos
          detrás de un solo panel.
        </p>
        <p>
          En{" "}
          <strong className="font-semibold text-foreground">
            Zephyr Dashboard
          </strong>{" "}
          conecté integraciones con{" "}
          <strong className="font-semibold text-foreground">HubSpot</strong>,{" "}
          <strong className="font-semibold text-foreground">NetForum</strong>,{" "}
          <strong className="font-semibold text-foreground">Google Wallet</strong>,{" "}
          <strong className="font-semibold text-foreground">Apple Wallet</strong>,{" "}
          <strong className="font-semibold text-foreground">Salesforce</strong> y{" "}
          <strong className="font-semibold text-foreground">Swoogo</strong>, junto
          con autenticación, sincronización y orquestación de flujos para que la
          información circule de forma confiable entre servicios.
        </p>
      </>
    ),
  },
  {
    id: "secdevs",
    periodLabel: "Septiembre 2023 — Diciembre 2024",
    dateTime: "2023-09",
    title: "Desarrollador backend",
    company: "Secdevs",
    companyUrl: "https://secdevs.com.ar/",
    productName: "Tasky",
    productUrl: "https://go.tasky.digital/",
    logos: [
      {
        src: "https://secdevs.com.ar/favicon.ico",
        alt: "Secdevs",
      },
      {
        src: "https://go.tasky.digital/favicon.ico",
        alt: "Tasky",
      },
    ],
    lead: (
      <>
        <p>
          Contribuí como desarrollador{" "}
          <strong className="font-semibold text-foreground">backend</strong> en{" "}
          <Link
            href="https://go.tasky.digital/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
          >
            Tasky
          </Link>
          , la plataforma integral de gestión y comunicación escolar:
          comunicaciones, calificaciones, asistencia, matriculación, aulas
          virtuales, pagos y más — pensada para alumnos, familias y equipo
          directivo, con todo conectado en un solo lugar.
        </p>
        <p>
          El foco estuvo en APIs, modelo de datos y lógica de negocio sobre un
          producto que acompaña instituciones reales y crece con ellas.
        </p>
        <p>
          En Secdevs también construí{" "}
          <strong className="font-semibold text-foreground">
            aplicaciones Android nativas
          </strong>
          , además del desarrollo backend en Tasky.
        </p>
      </>
    ),
  },
];

function LogoBadge({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-border bg-background p-1.5 shadow-sm md:size-14">
      <Image
        src={src}
        alt={alt}
        width={48}
        height={48}
        className="size-full object-contain"
        unoptimized={src.endsWith(".ico")}
      />
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="min-h-screen border-t border-border py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Experiencia
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Línea de tiempo de roles recientes y el impacto en cada producto.
        </p>

        <div className="relative mt-14 md:mt-16">
          {/* Línea: tramo superior “encendido” (presente), inferior más apagado */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[15px] top-3 bottom-3 w-[2px] md:left-[17px]"
          >
            <div
              className="absolute inset-0 rounded-full bg-linear-to-b from-primary via-primary/55 to-border opacity-90 shadow-[0_0_18px_rgba(167,139,250,0.45),0_0_6px_rgba(167,139,250,0.35)]"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 0%, black 46%, rgba(0,0,0,0.55) 52%, rgba(0,0,0,0.2) 58%, transparent 62%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, black 46%, rgba(0,0,0,0.55) 52%, rgba(0,0,0,0.2) 58%, transparent 62%)",
              }}
            />
            <div
              className="absolute inset-0 rounded-full bg-linear-to-b from-transparent via-border/40 to-border/90"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, transparent 48%, black 55%, black 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, transparent 48%, black 55%, black 100%)",
              }}
            />
          </div>

          <ol className="relative space-y-12 md:space-y-14">
            {EXPERIENCE.map((job) => (
              <li
                key={job.id}
                className="relative grid grid-cols-[auto_1fr] gap-4 md:gap-6"
              >
                <div className="relative flex w-8 shrink-0 justify-center pt-1 md:w-9">
                  <span
                    className={cn(
                      "relative z-10 mt-0.5 size-3 rounded-full border-2 bg-background md:size-3.5",
                      job.isCurrent
                        ? "border-primary shadow-[0_0_0_4px_var(--background),0_0_14px_5px_rgba(167,139,250,0.55)]"
                        : "border-muted-foreground/45 shadow-[0_0_0_4px_var(--background)]",
                    )}
                    aria-hidden
                  />
                </div>

                <article className="min-w-0 rounded-2xl border border-border/90 bg-linear-to-b from-card/60 to-card/25 p-6 shadow-sm backdrop-blur-sm md:p-8">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                      {job.id === "freelance" ? (
                        <div
                          className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-dashed border-border/80 bg-muted/30 text-[0.65rem] font-bold uppercase leading-tight tracking-tight text-muted-foreground md:size-14 md:text-xs"
                          aria-hidden
                          title="Zephyr Dashboard"
                        >
                          ZD
                        </div>
                      ) : job.logos && job.logos.length > 0 ? (
                        <div className="flex shrink-0 items-center gap-2">
                          {job.logos.map((logo) => (
                            <LogoBadge
                              key={logo.src}
                              src={logo.src}
                              alt={logo.alt}
                            />
                          ))}
                        </div>
                      ) : null}

                      <div className="min-w-0">
                        <time
                          className="text-sm tabular-nums text-muted-foreground"
                          dateTime={job.dateTime}
                        >
                          {job.periodLabel}
                        </time>
                        <h3 className="mt-1.5 text-lg font-semibold tracking-tight md:text-xl">
                          {job.title}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-primary">
                          {job.id === "freelance" ? (
                            job.company
                          ) : (
                            <>
                              {job.companyUrl ? (
                                <Link
                                  href={job.companyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline decoration-primary/35 underline-offset-4 transition-colors hover:decoration-primary"
                                >
                                  {job.company}
                                </Link>
                              ) : (
                                job.company
                              )}
                              {job.productName && job.productUrl ? (
                                <>
                                  {" "}
                                  <span className="text-muted-foreground">
                                    ·
                                  </span>{" "}
                                  <Link
                                    href={job.productUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                                  >
                                    {job.productName}
                                  </Link>
                                </>
                              ) : null}
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                    {job.lead}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
