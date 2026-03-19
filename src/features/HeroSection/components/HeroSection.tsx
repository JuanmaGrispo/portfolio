export default function HeroSection() {
  return (

    <section id="hero" className="min-h-[calc(100vh-80px)] flex items-center">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Tu Nombre
          </h1>
          <p className="mt-4 text-zinc-600">
            Tu tagline (ej. Full Stack Developer | Next.js + TypeScript)
          </p>
          {/* Más adelante acá van las CTAs */}
        </div>
      </div>
    </section>
  );
}
