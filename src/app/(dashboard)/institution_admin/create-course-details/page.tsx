import CreateCourseDetails from "@/components/modules/course/course-details/CreateCourseDetails";

export default async function CreateCourseDetailsPage({
  searchParams,
}: {
  searchParams: Promise<{ courseId?: string }>;
}) {
  const { courseId } = await searchParams;
  if (!courseId) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-8 text-sm text-destructive sm:px-6">
        A course ID is required to create an offering.
      </div>
    );
  }

  return <CreateCourseDetails courseId={courseId} />;
}
