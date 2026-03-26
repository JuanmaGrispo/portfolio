"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

const CONTACT_EMAIL = "juanmanuelgrispo@gmail.com";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/juanmanuelgrispo" },
  { label: "LinkedIn", href: "https://linkedin.com/in/juanmanuelgrispo" },
] as const;

const TRUST_SIGNALS = [
  "Enfoque técnico",
  "Implementación completa",
  "Sin compromiso",
] as const;

type FormState = "idle" | "loading" | "success" | "error";

const inputBase = cn(
  "w-full rounded-xl border border-border/70 bg-background/40 px-4 py-3",
  "text-base text-foreground placeholder:text-muted-foreground/40",
  "outline-none transition-colors duration-150",
  "focus:border-primary/50 focus:ring-1 focus:ring-primary/20",
  "disabled:opacity-50 disabled:cursor-not-allowed",
);

export default function ContactSection() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [tooltip, setTooltip] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("loading");

    const data = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) throw new Error();
      setFormState("success");
      formRef.current?.reset();
    } catch {
      setFormState("error");
    }
  }

  function handleSocialClick(e: React.MouseEvent, label: string) {
    e.preventDefault();
    setTooltip(label);
    setTimeout(() => setTooltip(null), 2500);
  }

  const isLoading = formState === "loading";

  return (
    <section
      id="contact"
      className="relative flex min-h-[75vh] flex-col justify-center overflow-hidden border-t border-border py-28 md:py-36"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 60%, rgba(167, 139, 250, 0.07), transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-2xl px-5 sm:px-8 md:px-10">
        {/* Eyebrow */}
        <p className="text-center text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted-foreground md:text-xs">
          04 — CONTACTO
        </p>

        {/* Headline */}
        <h2 className="mt-4 text-center text-pretty text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
          ¿Tenés una idea?
        </h2>

        {/* Copy */}
        <p className="mt-5 text-center text-base leading-relaxed text-muted-foreground md:text-lg">
          Si no sabés por dónde empezar, te ayudo a bajarlo a algo concreto y
          funcional.
        </p>

        {/* Trust signals */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {TRUST_SIGNALS.map((signal) => (
            <span
              key={signal}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold",
                "border-primary/35 bg-primary/10 text-primary",
                "shadow-[0_0_0_1px_rgba(167,139,250,0.08)]",
              )}
            >
              {signal}
            </span>
          ))}
        </div>

        {/* Form */}
        <div className="mt-10 rounded-2xl border border-border/70 bg-card/20 p-6 md:p-8">
          {formState === "success" ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <span className="flex size-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <p className="text-base font-semibold text-foreground">
                Mensaje enviado.
              </p>
              <p className="text-sm text-muted-foreground">
                Te respondo en menos de 24h.
              </p>
              <button
                type="button"
                onClick={() => setFormState("idle")}
                className="mt-2 text-sm font-medium text-primary underline decoration-primary/35 underline-offset-4 transition-colors hover:decoration-primary"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-name"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Nombre
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Tu nombre"
                  disabled={isLoading}
                  className={inputBase}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="tu@email.com"
                  disabled={isLoading}
                  className={inputBase}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Contame tu idea, proyecto o consulta..."
                  disabled={isLoading}
                  className={cn(inputBase, "resize-none")}
                />
              </div>

              {formState === "error" && (
                <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  Hubo un error. Probá de nuevo o escribime directo por email.
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "mt-1 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-8 py-4 text-base font-semibold",
                  "bg-primary text-primary-foreground",
                  "shadow-[0_0_0_1px_rgba(167,139,250,0.25),0_8px_32px_-8px_rgba(167,139,250,0.35)]",
                  "transition-[transform,box-shadow,opacity] duration-200",
                  "hover:scale-[1.02] hover:shadow-[0_0_0_1px_rgba(167,139,250,0.4),0_12px_40px_-8px_rgba(167,139,250,0.45)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  "active:scale-[0.99] disabled:scale-100 disabled:opacity-60 disabled:cursor-not-allowed",
                )}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    Contame tu idea
                    <span aria-hidden className="text-lg leading-none">
                      →
                    </span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-muted-foreground/60">
                Sin compromiso. Solo charlamos tu idea.
              </p>
            </form>
          )}
        </div>

        {/* Fallback email */}
        <p className="mt-8 text-center text-sm text-muted-foreground/70">
          También podés escribirme directo a{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {CONTACT_EMAIL}
          </a>
        </p>

        {/* Social links */}
        <div className="mt-6 flex items-center justify-center gap-6">
          {SOCIAL_LINKS.map((link) => (
            <div key={link.label} className="relative">
              <a
                href={link.href}
                onClick={(e) => handleSocialClick(e, link.label)}
                className={cn(
                  "text-sm font-medium text-muted-foreground/70",
                  "transition-colors duration-200 hover:text-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                )}
              >
                {link.label}
              </a>
              {tooltip === link.label && (
                <span
                  className={cn(
                    "pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2",
                    "whitespace-nowrap rounded-lg border border-border/80 bg-card px-3 py-1.5",
                    "text-xs font-medium text-muted-foreground shadow-sm",
                    "animate-in fade-in-0 zoom-in-95 duration-150",
                  )}
                >
                  Estamos trabajando en esto
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
