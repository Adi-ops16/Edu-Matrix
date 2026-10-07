"use client";

import { Spinner } from "@/components/ui/spinner";
import { useGetProfile } from "@/hooks";
import AdminCourseDetailsTable from "./AdminCourseDetailsTable";
import StudentCourseDetails from "./StudentCourseDetails";

interface Props {
  courseId: string;
}
export default function CourseDetails({ courseId }: Props) {
  const { data: userResponse, isLoading, isError } = useGetProfile();
  const user = userResponse?.data;
  const role = user?.role;

  if (isLoading) {
    return (
      <div className="flex min-h-48 items-center justify-center gap-2 text-sm text-muted-foreground">
        <Spinner /> Loading course details...
      </div>
    );
  }

  if (isError || !role) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:px-8">
        Couldn&apos;t load your profile to display course details.
      </div>
    );
  }

  return role === "INSTITUTION_ADMIN" ? (
    <AdminCourseDetailsTable courseId={courseId} />
  ) : role === "STUDENT" || role === "TEACHER" ? (
    <StudentCourseDetails courseId={courseId} />
  ) : (
    <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:px-8">
      Course details are not available for this role.
    </div>
  );
}
