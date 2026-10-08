"use client";

import { Spinner } from "@/components/ui/spinner";
import { useGetMyCourses } from "@/hooks";
import MyCourseCard from "./MyCourseCard";

export type Audience = "STUDENT" | "TEACHER";

export default function MyCourses({ audience }: { audience: Audience }) {
  const { data, isLoading, isError } = useGetMyCourses();
  const courses = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex min-h-48 items-center justify-center gap-2 text-sm text-muted-foreground">
        <Spinner /> Loading your courses...
      </div>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header>
        <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
          My courses
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {audience === "STUDENT"
            ? "Courses you are enrolled in."
            : "Courses assigned to you for teaching."}
        </p>
      </header>

      {isError ? (
        <div className="rounded-lg border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
          Couldn&apos;t load your courses.
        </div>
      ) : courses.length === 0 ? (
        <div className="rounded-lg border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
          {audience === "STUDENT"
            ? "You are not enrolled in any courses yet."
            : "No courses are assigned to you yet."}
        </div>
      ) : (
        <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {courses.map((course, index) => (
            <MyCourseCard
              key={`${course.course.code}-${course.semester}-${index}`}
              course={course}
              audience={audience}
            />
          ))}
        </div>
      )}
    </section>
  );
}
