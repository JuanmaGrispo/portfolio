"use client";

import { useEffect, useState } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const linkClassName = cn(
  "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors",
  "hover:bg-muted/60 hover:text-foreground",
  "focus-visible:bg-muted/60 focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none",
  "data-[active=true]:bg-muted/50 data-[active=true]:text-foreground",
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-300 ease-out",
        scrolled
          ? "border-border/40 bg-background/85 backdrop-blur-sm"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex w-full max-w-6xl justify-end px-6 py-4"
      >
        <NavigationMenu viewport={false} className="relative">
          <NavigationMenuList className="gap-0.5">
            <NavigationMenuItem>
              <NavigationMenuLink href="#hero" className={linkClassName}>
                Inicio
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#experience" className={linkClassName}>
                Experiencia
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#projects" className={linkClassName}>
                Proyectos
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#contact" className={linkClassName}>
                Contacto
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </header>
  );
}
