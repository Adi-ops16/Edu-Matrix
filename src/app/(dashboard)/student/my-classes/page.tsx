export default async function StudentMyClassesPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const { course } = await searchParams;

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header>
        <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
          Classes
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {course
            ? `No classes are available for ${course} yet.`
            : "No classes are available for this course yet."}
        </p>
      </header>
      <output className="rounded-lg border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
        Class materials will appear here when they become available.
      </output>
    </section>
  );
}
