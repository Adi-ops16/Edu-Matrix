import { IconArrowRight, IconCalendar, IconUpload } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { MyCoursesResponse } from "@/types";
import formatDate from "@/utils/formatDate";
import triggerToast from "@/utils/triggerToast";
import type { Audience } from "./MyCourses";

export default function MyCourseCard({
  course,
  audience,
}: {
  course: MyCoursesResponse;
  audience: Audience;
}) {
  const isStudent = audience === "STUDENT";

  return (
    <Card className="flex h-full flex-col rounded-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="wrap-break-word">
              {course.course.title}
            </CardTitle>
            <CardDescription className="mt-1 font-mono">
              {course.course.code}
            </CardDescription>
          </div>
          <span className="shrink-0 rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
            {course.status.toLowerCase()}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <p className="line-clamp-3 whitespace-pre-wrap text-sm text-muted-foreground">
          {course.course.description || "No course description provided."}
        </p>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t pt-4 text-sm">
          <div>
            <dt className="text-muted-foreground">Department</dt>
            <dd className="mt-1 font-medium">{course.department.name}</dd>
            <dd className="font-mono text-xs text-muted-foreground">
              {course.department.code}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Semester</dt>
            <dd className="mt-1 font-medium">{course.semester}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Starts</dt>
            <dd className="mt-1 inline-flex items-center gap-1.5 font-medium">
              <IconCalendar
                className="size-4 text-muted-foreground"
                aria-hidden="true"
              />
              {formatDate(course.start_date)}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Ends</dt>
            <dd className="mt-1 font-medium">{formatDate(course.end_date)}</dd>
          </div>
        </dl>

        {course.course.learning_outcomes.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-medium">Learning outcomes</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              {course.course.learning_outcomes
                .slice(0, 3)
                .map((outcome, index) => (
                  <li
                    key={`${course.course.code}-outcome-${index}`}
                    className="line-clamp-1"
                  >
                    {outcome}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-end">
        {isStudent ? (
          <Link
            href={`/student/my-classes?course=${encodeURIComponent(course.course.code)}`}
          >
            <Button type="button">
              View classes <IconArrowRight aria-hidden="true" />
            </Button>
          </Link>
        ) : (
          <Button
            type="button"
            onClick={() =>
              triggerToast({
                type: "info",
                title: "Class uploads are in development",
                description:
                  "Uploading classes will be available in a future update.",
              })
            }
          >
            <IconUpload aria-hidden="true" /> Upload classes
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
