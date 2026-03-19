type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 md:px-10 md:py-20">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Project: {slug}
        </h1>
        <p className="mt-4 text-zinc-600">
          This is a placeholder for the project detail page.
        </p>
      </section>
    </main>
  );
}

