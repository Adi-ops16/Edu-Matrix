import { IconCash, IconInfoCircle } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Course, Role } from "@/types";

interface Props {
  course: Course;
  role: Role;
}

export default function CourseCard({ course, role }: Props) {
  const isAdmin = role === "INSTITUTION_ADMIN";
  const isStudent = role === "STUDENT";
  const detailsHref = isStudent
    ? `/student/courses/${course.id}`
    : `/institution_admin/courses/${course.id}`;
  return (
    <Card className="h-full rounded-lg">
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription className="font-mono">{course.code}</CardDescription>
        {course.course_details && (
          <CardAction>
            <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
              {course.course_details.status.toLowerCase()}
            </span>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <p className="line-clamp-3 whitespace-pre-wrap text-muted-foreground">
          {course.description || "No course description provided."}
        </p>
        {course.learning_outcomes.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-medium">Learning outcomes</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              {course.learning_outcomes.slice(0, 3).map((outcome, index) => (
                <li
                  key={`${course.id}-outcome-${index}`}
                  className="line-clamp-1"
                >
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        )}
        {course.course_details ? (
          <dl className="grid grid-cols-2 gap-3 border-t pt-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Semester</dt>
              <dd className="font-medium">{course.course_details.semester}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Batch</dt>
              <dd className="font-medium">{course.course_details.batch}</dd>
            </div>
          </dl>
        ) : (
          <h1 className="text-sm text-muted-foreground">
            *This course has no ongoing batch
          </h1>
        )}
      </CardContent>

      <CardFooter className="flex justify-end">
        {isAdmin && (
          <Link href={detailsHref}>
            <Button type="button" size="sm">
              <IconInfoCircle />
              Details
            </Button>
          </Link>
        )}

        {course.course_details && isStudent && (
          <Link href={detailsHref}>
            <Button type="button">
              <IconCash />
              Buy this course
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
