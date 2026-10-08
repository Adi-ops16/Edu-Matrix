"use client";

import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import type { FetchError } from "ofetch";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCourseDetailsForAdmin, useUpdateCourseStatus } from "@/hooks";
import formatDate from "@/utils/formatDate";
import triggerToast from "@/utils/triggerToast";
import CourseDetailsSheet from "./CourseDetailsSheet";

export default function AdminCourseDetailsTable({
  courseId,
}: {
  courseId: string;
}) {
  const [updatingCourseDetailsId, setUpdatingCourseDetailsId] = useState<
    number | null
  >(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetCourseDetailsForAdmin(courseId, {
    sortBy: "created_at",
    sortOrder,
  });
  const courseDetails = response?.data ?? [];

  const { mutate: update } = useUpdateCourseStatus();

  const handleReview = ({
    status,
    course_details_id,
  }: {
    course_details_id: number;
    status: "ONGOING" | "COMPLETED";
  }) => {
    setUpdatingCourseDetailsId(course_details_id);
    update(
      { status, course_details_id },
      {
        onSuccess: (res) => {
          if (!res.success) {
            triggerToast({
              type: "error",
              title: "Course status update failed",
              description: res.message || "Please try again.",
            });
            return;
          }

          triggerToast({
            type: "success",
            title: "Course status updated",
            description: res.message || "Your profile has been updated.",
          });
        },
        onError: (error: FetchError) => {
          triggerToast({
            type: "error",
            title: "Course status update failed",
            description: error.data?.message || "Internal Server Error",
          });
        },
        onSettled: () => {
          setUpdatingCourseDetailsId(null);
        },
      },
    );
  };

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
            Course offerings
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Review batches, schedules, and current offering status.
          </p>
        </div>
        <div className="flex gap-1 items-center">
          <Link
            href={`/institution_admin/create-course-details?courseId=${courseId}`}
          >
            <Button>
              <IconPlus />
              Create New Batch
            </Button>
          </Link>
          <Select
            items={[
              { value: "desc", label: "Newest first" },
              { value: "asc", label: "Oldest first" },
            ]}
            value={sortOrder}
            onValueChange={(value) => {
              if (value === "asc" || value === "desc") setSortOrder(value);
            }}
          >
            <SelectTrigger
              className="w-full sm:w-52"
              aria-label="Sort offerings"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Newest first</SelectItem>
              <SelectItem value="asc">Oldest first</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="overflow-x-auto rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="min-w-32">Semester</TableHead>
              <TableHead className="min-w-28">Batch</TableHead>
              <TableHead className="min-w-36">Start date</TableHead>
              <TableHead className="min-w-32">Status</TableHead>
              <TableHead className="min-w-88 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center">
                  <span className="inline-flex items-center gap-2 text-muted-foreground">
                    <Spinner /> Loading course offerings...
                  </span>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <span>Couldn&apos;t load course offerings.</span>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => void refetch()}
                    >
                      Try again
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : courseDetails.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-muted-foreground"
                >
                  No course offerings have been created.
                </TableCell>
              </TableRow>
            ) : (
              courseDetails.map((details) => {
                const isUpdating = updatingCourseDetailsId === details.id;
                return (
                  <TableRow key={details.id}>
                    <TableCell className="font-medium">
                      {details.semester}
                    </TableCell>
                    <TableCell>{details.batch}</TableCell>
                    <TableCell>
                      {formatDate(details.start_date) || "Not set"}
                    </TableCell>
                    <TableCell>
                      <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                        {details.status.toLowerCase()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap justify-end gap-2">
                        <CourseDetailsSheet details={details} />
                        {details.status === "UPCOMING" && (
                          <Button
                            size="sm"
                            disabled={isUpdating}
                            variant="secondary"
                            onClick={() => {
                              handleReview({
                                status: "ONGOING",
                                course_details_id: details.id,
                              });
                            }}
                          >
                            {isUpdating && <Spinner />}
                            Mark as Ongoing
                          </Button>
                        )}
                        {details.status === "ONGOING" && (
                          <Button
                            onClick={() => {
                              handleReview({
                                status: "COMPLETED",
                                course_details_id: details.id,
                              });
                            }}
                            size="sm"
                            disabled={isUpdating}
                          >
                            {!!isUpdating && <Spinner />}
                            Mark as Completed
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
