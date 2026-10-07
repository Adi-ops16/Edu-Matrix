import CourseDetails from "@/components/modules/course/course-details/CourseDetails";

export default async function StudentCourseDetailsPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  return <CourseDetails courseId={courseId} />;
}