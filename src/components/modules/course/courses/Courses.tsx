"use client";

import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import CourseCardsSkeleton from "@/components/shared/CourseCardsSkeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetCourses,
  useGetDepartments,
  useGetProfileSuspense,
} from "@/hooks";
import type { Role } from "@/types";
import CourseCard from "./CourseCard";

export default function Courses() {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");

  const { data: departmentResponse } = useGetDepartments();

  const departments = departmentResponse.data?.departments ?? [];
  const activeDepartmentId = selectedDepartmentId || departments[0]?.id || "";

  const {
    data: courseResponse,
    isLoading,
    isError,
    refetch,
  } = useGetCourses(activeDepartmentId, {});
  const courses = courseResponse?.data ?? [];

  const { data: userResponse } = useGetProfileSuspense();
  const user = userResponse?.data;
  const role = user?.role as Role;

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
            Courses
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse and {role === "STUDENT" ? "buy" : "manage"} courses offered
            by your institution.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {departments.length > 0 && (
            <Select
              items={departments.map((department) => ({
                key: department.id,
                value: department.id,
                label: `${department.name} (${department.code})`,
              }))}
              value={activeDepartmentId}
              onValueChange={(value) => setSelectedDepartmentId(value ?? "")}
            >
              <SelectTrigger
                className="w-full sm:w-72"
                aria-label="Select department"
              >
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department.id} value={department.id}>
                    {department.name} ({department.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {role === "INSTITUTION_ADMIN" && (
            <Link href="/institution_admin/create-course">
              <Button className="w-full sm:w-auto">
                <IconPlus aria-hidden="true" /> Create course
              </Button>
            </Link>
          )}
        </div>
      </header>
      {departments.length === 0 ? (
        <div className="rounded-lg border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
          No department found.
        </div>
      ) : isLoading ? (
        <CourseCardsSkeleton count={3} />
      ) : isError ? (
        <div className="flex flex-col items-center gap-3 rounded-lg border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
          <p>Couldn&apos;t load courses for this department.</p>
          <Button
            type="button"
            variant="outline"
            onClick={() => void refetch()}
          >
            Try again
          </Button>
        </div>
      ) : courses.length === 0 ? (
        <div className="rounded-lg border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
          No courses have been added to this department yet.
        </div>
      ) : (
        <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard role={role} key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}
