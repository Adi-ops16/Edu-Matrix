import Link from "next/link";
import CreateCourseDetailsForm from "@/components/forms/CreateCourseDetailsForm";

export default function CreateCourseDetails({
  courseId,
}: {
  courseId: string;
}) {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header>
        <Link
          href={`/institution_admin/courses/${courseId}`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Course offerings
        </Link>
        <h1 className="mt-2 font-heading text-2xl font-semibold sm:text-3xl">
          Create course offering
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Add a semester, batch, schedule, and price for this course.
        </p>
      </header>
      <CreateCourseDetailsForm courseId={courseId} />
    </section>
  );
}
