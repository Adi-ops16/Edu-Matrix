import StripePaymentButton from "@/components/Buttons/StripePaymentButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useGetCourseDetailsForStudents } from "@/hooks";
import type { CourseDetailsStudent } from "@/types";
import formatDate from "@/utils/formatDate";
import getInitials from "@/utils/getInitials";

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(7rem,0.8fr)_1.2fr] gap-4 border-b py-3 last:border-0">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="min-w-0 wrap-break-word text-sm font-medium">
        {children}
      </dd>
    </div>
  );
}

function StudentCourseLayout({
  courseDetails,
}: {
  courseDetails: CourseDetailsStudent;
}) {
  const department = courseDetails.department;
  const teachers = courseDetails.teachers;

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="max-w-4xl space-y-3">
        <p className="font-mono text-sm text-muted-foreground">
          {courseDetails.code}
        </p>
        <h1 className="font-heading text-2xl font-semibold wrap-break-word sm:text-3xl">
          {courseDetails.title}
        </h1>
        <p className="whitespace-pre-wrap text-muted-foreground">
          {courseDetails.description || "No course description provided."}
        </p>
      </header>

      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <Card className="h-fit rounded-lg">
          <CardHeader>
            <CardTitle>Course information</CardTitle>
            <CardDescription>
              What you will study in this course.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {courseDetails.learning_outcomes?.length > 0 && (
              <section>
                <h2 className="mb-2 text-sm font-semibold">
                  Learning outcomes
                </h2>
                <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                  {courseDetails.learning_outcomes.map((outcome, index) => (
                    <li key={`${courseDetails.id}-outcome-${index}`}>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {courseDetails ? (
              <section className="border-t pt-4">
                <h2 className="mb-2 text-sm font-semibold">Course details</h2>
                <dl>
                  <Detail label="Semester">{courseDetails.semester}</Detail>
                  <Detail label="Batch">{courseDetails.batch}</Detail>
                  <Detail label="Start date">
                    {formatDate(courseDetails.start_date)}
                  </Detail>
                  <Detail label="End date">
                    {formatDate(courseDetails.end_date)}
                  </Detail>
                  <Detail label="Status">{courseDetails.status}</Detail>
                  <Detail label="Price">
                    {courseDetails.price} {courseDetails.currency}
                  </Detail>
                </dl>
              </section>
            ) : (
              <p className="border-t pt-4 text-sm text-muted-foreground">
                Course courseDetails details are not available yet.
              </p>
            )}
          </CardContent>
        </Card>

        <aside className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-1">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Department</CardTitle>
              <CardDescription>{department.code}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <h2 className="font-medium">{department.name}</h2>
              <p className="text-sm text-muted-foreground">
                {department.department_description ||
                  "No department description provided."}
              </p>
              <p className="text-sm text-muted-foreground">
                Established {department.department_established_year}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Teaching team</CardTitle>
              <CardDescription>
                {courseDetails.teachers.length} course instructor
                {courseDetails.teachers.length === 1 ? "" : "s"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {courseDetails.teachers.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Instructors haven&apos;t been assigned yet.
                </p>
              ) : (
                teachers.map((teacher, index) => (
                  <div
                    key={`${teacher.name}-${index}`}
                    className="flex min-w-0 items-start gap-3"
                  >
                    <Avatar>
                      <AvatarImage src={teacher.profile_url ?? ""} alt="" />
                      <AvatarFallback>
                        {getInitials(teacher.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{teacher.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {[teacher.degree, teacher.specialization]
                          .filter(Boolean)
                          .join(" · ") || "Instructor"}
                      </p>
                      {teacher.certificate_url && (
                        <a
                          href={teacher.certificate_url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 inline-block text-sm text-primary underline underline-offset-4"
                        >
                          View certificate
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <StripePaymentButton courseDetails={courseDetails} />
        </aside>
      </div>
    </section>
  );
}

export default function StudentCourseDetails({
  courseId,
}: {
  courseId: string;
}) {
  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetCourseDetailsForStudents(courseId);

  if (isLoading) {
    return (
      <div className="flex min-h-48 items-center justify-center gap-2 text-sm text-muted-foreground">
        <Spinner /> Loading course details...
      </div>
    );
  }

  if (isError || !response?.data) {
    return (
      <div className="flex min-h-48 flex-col items-center justify-center gap-3 px-4 text-sm text-muted-foreground">
        <p>Couldn&apos;t load this course.</p>
        <Button type="button" variant="outline" onClick={() => void refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return <StudentCourseLayout courseDetails={response.data} />;
}
