import type { Metadata } from "next";
import { Figtree, Geist_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { PageAnimatedBackground } from "@/components/effects/PageAnimatedBackground";
import Navbar from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";
import { GsapRegister } from "@/components/effects/GsapRegister";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Serif editorial para el titular del hero: legible, sobria, sensación senior. */
const heroSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hero-serif",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Sitio en construcción.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn(
        "dark",
        "h-full",
        "antialiased",
        figtree.variable,
        geistMono.variable,
        heroSerif.variable,
        "font-sans",
      )}
    >
      <body className="relative flex min-h-dvh flex-col">
        {/** Fondo fijo: animado + linterna (solo fondo; el texto va en z-10). */}
        <div
          className="pointer-events-none fixed inset-0 z-0 isolate min-h-dvh w-full"
          aria-hidden
        >
          <PageAnimatedBackground />
        </div>
        <GsapRegister />
        {/**
         * Navbar fuera de `.site-base-dim`: el `filter` del wrapper crea un containing
         * block que rompe `position: fixed` del menú móvil (overlay y clicks en touch).
         */}
        <Navbar />
        <div className="site-base-dim relative z-10 flex min-h-full min-w-0 flex-1 flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
