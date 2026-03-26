"use client";

import { cn } from "@/lib/utils";
import { scrollToSection } from "@/lib/scrollToSection";

export default function HeroActions() {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:justify-center sm:gap-3 md:mt-10">
      <a
        href="#contact"
        onClick={(e) => scrollToSection("contact", e)}
        className={cn(
          "inline-flex w-full items-center justify-center rounded-xl px-7 py-3 text-center text-base font-semibold sm:w-auto",
          "bg-primary text-primary-foreground",
          "transition-[transform,box-shadow] duration-200",
          "hover:scale-[1.02] hover:bg-primary/90",
          "hover:shadow-[0_0_24px_-8px_rgba(167,139,250,0.35)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "active:scale-100",
        )}
      >
        Contame tu idea →
      </a>
      <a
        href="#projects"
        onClick={(e) => scrollToSection("projects", e)}
        className={cn(
          "inline-flex w-full items-center justify-center rounded-xl px-7 py-3 text-center text-base font-medium sm:w-auto",
          "border border-border/60 bg-muted/20 text-foreground/80",
          "transition-[transform,background-color,border-color] duration-200",
          "hover:scale-[1.02] hover:border-border hover:bg-muted/40 hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "active:scale-100",
        )}
      >
        Ver proyectos
      </a>
    </div>
  );
}
