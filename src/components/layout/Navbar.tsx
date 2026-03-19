import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-background/70 background-blur">
      <nav aria-label="Navegación principal" className="w-full">
        <div className="mx-auto flex max-w-6xl justify-end px-6 pt-6">
          {/* Fondo “flotante” en diagonal: el contenido no se inclina. */}
          <div className="relative w-max">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-background/60 backdrop-blur shadow-sm -skew-x-12" />
            <NavigationMenu className="relative">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#hero">Sobre mi</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#experience">
                    Experiencia
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#projects">Proyectos</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#contact">Contacto</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </nav>
    </header>
  );
}
