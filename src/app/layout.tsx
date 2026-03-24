import type { Metadata } from "next";
import { Figtree, Geist_Mono } from "next/font/google";
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
        {/** Contenido por encima del fondo; scroll solo aquí */}
        <div className="site-base-dim relative z-10 flex min-h-full min-w-0 flex-1 flex-col">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
