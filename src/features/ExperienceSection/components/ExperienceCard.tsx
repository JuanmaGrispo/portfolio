"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef } from "react";

import type { ExperienceItem } from "@/data/experience";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

type ExperienceCardProps = {
  item: ExperienceItem;
  isExpanded: boolean;
  onToggle: () => void;
};

function LogoBadge({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative size-11 shrink-0 overflow-hidden rounded-xl border border-border bg-background p-1.5 shadow-sm md:size-12">
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

export default function ExperienceCard({
  item,
  isExpanded,
  onToggle,
}: ExperienceCardProps) {
  const articleRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLSpanElement>(null);
  const panelId = useId();

  const setPanelRef = useCallback(
    (el: HTMLDivElement | null) => {
      panelRef.current = el;
      if (el && !isExpanded) {
        el.style.height = "0";
        el.style.overflow = "hidden";
      }
    },
    [isExpanded],
  );

  useGSAP(
    () => {
      const panel = panelRef.current;
      const inner = innerRef.current;
      const chevron = chevronRef.current;
      if (!panel || !inner) return;

      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const revealEls = inner.querySelectorAll<HTMLElement>("[data-exp-reveal]");

      if (reduced) {
        gsap.killTweensOf([panel, inner, chevron, ...revealEls]);
        gsap.set(panel, { height: isExpanded ? "auto" : 0, overflow: "hidden" });
        gsap.set(inner, { opacity: isExpanded ? 1 : 0, y: 0 });
        gsap.set(revealEls, {
          opacity: isExpanded ? 1 : 0,
          y: 0,
          clearProps: isExpanded ? "opacity,y" : undefined,
        });
        if (chevron) gsap.set(chevron, { rotation: isExpanded ? 180 : 0 });
        return;
      }

      gsap.killTweensOf([panel, inner, chevron, ...revealEls]);

      if (isExpanded) {
        gsap.set(panel, { height: 0, overflow: "hidden" });
        gsap.set(inner, { opacity: 1 });
        const fullH = inner.scrollHeight;

        gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            gsap.set(panel, { height: "auto", clearProps: "overflow" });
          },
        })
          .to(
            panel,
            {
              height: fullH,
              duration: 0.62,
              ease: "power3.out",
            },
            0,
          )
          .fromTo(
            revealEls,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.052,
              duration: 0.42,
              ease: "power2.out",
            },
            0.1,
          );

        if (chevron) {
          gsap.to(chevron, {
            rotation: 180,
            duration: 0.55,
            ease: "power2.out",
          });
        }
      } else {
        if (panel.offsetHeight <= 0) {
          gsap.set(panel, { height: 0, overflow: "hidden" });
          gsap.set(inner, { opacity: 0, y: 14 });
          gsap.set(revealEls, { opacity: 0, y: 10 });
          if (chevron) gsap.set(chevron, { rotation: 0 });
          return;
        }

        const currentH = panel.offsetHeight;
        gsap.set(panel, { height: currentH, overflow: "hidden" });

        gsap
          .timeline({
            onComplete: () => {
              gsap.set(panel, { height: 0 });
              gsap.set(inner, { opacity: 0, y: 14 });
            },
          })
          .to(revealEls, {
            opacity: 0,
            y: 6,
            stagger: { each: 0.028, from: "end" },
            duration: 0.26,
            ease: "power2.in",
          })
          .to(
            panel,
            {
              height: 0,
              duration: 0.5,
              ease: "power3.inOut",
            },
            0.06,
          );

        if (chevron) {
          gsap.to(chevron, {
            rotation: 0,
            duration: 0.45,
            ease: "power2.inOut",
          });
        }
      }
    },
    { dependencies: [isExpanded], scope: articleRef },
  );

  useEffect(() => {
    if (!isExpanded) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frame = requestAnimationFrame(() => {
      articleRef.current?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "nearest",
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [isExpanded]);

  const companyLine = (
    <p className="mt-0.5 text-sm font-medium text-primary">
      {item.companyUrl ? (
        <span className="text-foreground">{item.company}</span>
      ) : (
        item.company
      )}
      {item.productName ? (
        <>
          <span className="text-muted-foreground"> · </span>
          <span className="font-semibold text-foreground">
            {item.productName}
          </span>
        </>
      ) : null}
    </p>
  );

  return (
    <article
      ref={articleRef}
      className={cn(
        "experience-card-scroll-margin rounded-2xl border border-border/90 shadow-sm backdrop-blur-sm",
        "bg-linear-to-b from-card/60 to-card/25",
        "transition-[transform,box-shadow] duration-300 ease-out will-change-transform",
        isExpanded
          ? "from-card/75 to-card/40 shadow-md ring-1 ring-primary/10"
          : "hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45),0_0_0_1px_rgba(167,139,250,0.12)]",
      )}
      style={{ cursor: isExpanded ? undefined : "pointer" }}
    >
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          "flex w-full min-h-[4.5rem] flex-col gap-2 rounded-2xl p-4 text-left transition-colors sm:p-5 md:min-h-0 md:flex-row md:items-start md:gap-5 md:p-6",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        )}
      >
        <div className="flex w-full gap-4 md:items-start">
          {item.icon === "briefcase" ? (
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-muted/30 text-muted-foreground md:size-12"
              aria-hidden
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                <line x1="12" y1="12" x2="12" y2="12" strokeWidth="2" />
                <path d="M2 13h20" />
              </svg>
            </div>
          ) : item.monogram ? (
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-dashed border-border/80 bg-muted/30 text-[0.65rem] font-bold uppercase leading-tight tracking-tight text-muted-foreground md:size-12 md:text-xs"
              aria-hidden
              title={item.monogramTitle}
            >
              {item.monogram}
            </div>
          ) : item.logos && item.logos.length > 0 ? (
            <div className="flex shrink-0 items-center gap-2">
              {item.logos.map((logo) => (
                <LogoBadge key={logo.src} src={logo.src} alt={logo.alt} />
              ))}
            </div>
          ) : null}

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <time
                className="text-sm tabular-nums text-muted-foreground"
                dateTime={item.dateTime}
              >
                {item.periodLabel}
              </time>
              <span
                ref={chevronRef}
                aria-hidden
                className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground will-change-transform md:size-9"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </div>
            <h3 className="mt-1 flex flex-wrap items-center gap-2 text-lg font-semibold tracking-tight md:text-xl">
              {item.title}
              {item.isCurrent ? (
                <span className="rounded-full border border-primary/35 bg-primary/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-primary">
                  Actual
                </span>
              ) : null}
            </h3>
            {companyLine}
            <p className="mt-2 text-pretty text-sm font-medium leading-snug text-foreground md:text-base">
              {item.summaryLine}
            </p>
          </div>
        </div>
      </button>

      <div
        ref={setPanelRef}
        id={panelId}
        role="region"
        aria-label={`Detalle de ${item.title}`}
        aria-hidden={!isExpanded}
        inert={!isExpanded ? true : undefined}
        className="overflow-hidden border-t border-border/60 px-5 pt-0 md:px-8"
      >
        <div ref={innerRef} className="pb-6 pt-5 text-sm leading-relaxed text-muted-foreground md:pb-8 md:text-base">
          {(item.companyUrl || item.productUrl) && (
            <p className="mb-4 text-sm font-medium" data-exp-reveal>
              {item.companyUrl ? (
                <Link
                  href={item.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline decoration-primary/35 underline-offset-4 transition-colors hover:decoration-primary"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.company}
                </Link>
              ) : (
                item.company
              )}
              {item.productName && item.productUrl ? (
                <>
                  <span className="text-muted-foreground"> · </span>
                  <Link
                    href={item.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.productName}
                  </Link>
                </>
              ) : null}
            </p>
          )}

          <p className="text-pretty" data-exp-reveal>
            {item.description}
          </p>

          <ul className="mt-4 list-none space-y-2.5 p-0">
            {item.bullets.map((bullet) => (
              <li
                key={bullet}
                data-exp-reveal
                className="relative pl-5 text-pretty before:absolute before:left-0 before:top-[0.55em] before:size-1.5 before:rounded-full before:bg-primary/70"
              >
                {bullet}
              </li>
            ))}
          </ul>

          {item.stackTags && item.stackTags.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2" data-exp-reveal>
              {item.stackTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border/80 bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          {item.impact ? (
            <p
              className="mt-6 border-l-2 border-primary/40 pl-4 text-sm italic text-muted-foreground"
              data-exp-reveal
            >
              {item.impact}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
