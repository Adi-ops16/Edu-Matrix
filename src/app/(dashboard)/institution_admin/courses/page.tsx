import { Suspense } from "react";
import Courses from "@/components/modules/course/courses/Courses";
import CourseCardsSkeleton from "@/components/shared/CourseCardsSkeleton";

export default function CoursesPage() {
  return (
    <Suspense fallback={<CourseCardsSkeleton withHeader />}>
      <Courses />
    </Suspense>
  );
}
