"use client";

import CreateCourseForm from "@/components/forms/CreateCourseForm";

export default function CreateCourses() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header>
        <h1 className="mt-2 font-heading text-2xl font-semibold sm:text-3xl">
          Create course
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Add a course to one of your institution&apos;s departments.
        </p>
      </header>
      <CreateCourseForm />
    </section>
  );
}
