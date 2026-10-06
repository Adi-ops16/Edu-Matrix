"use client";

import type { FetchError } from "ofetch";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetDepartmentRequests,
  useGetDepartments,
  useReviewDepartmentJoiningApplication,
} from "@/hooks";
import type { DepartmentJoinRequest } from "@/types";
import triggerToast from "@/utils/triggerToast";
import type { DepartmentRequestReviewStatus } from "./DepartmentRequestsTable";
import DepartmentRequestsTabs from "./DepartmentRequestsTabs";

export default function JoinDepartment() {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");

  const { data: departmentResponse } = useGetDepartments();
  const departments = departmentResponse.data?.departments ?? [];
  const activeDepartmentId = selectedDepartmentId || departments[0]?.id || "";

  const {
    data: requestResponse,
    isLoading,
    isError,
    refetch,
  } = useGetDepartmentRequests(activeDepartmentId);
  const { mutate: reviewRequest, isPending } =
    useReviewDepartmentJoiningApplication();

  const applicants = requestResponse?.data;

  const handleReview = (
    applicant: DepartmentJoinRequest,
    status: DepartmentRequestReviewStatus,
  ) => {
    if (!activeDepartmentId || !applicant.id) return;

    reviewRequest(
      {
        department_id: activeDepartmentId,
        user_id: applicant.id,
        role: applicant.role,
        status,
      },
      {
        onSuccess: (response) => {
          if (!response.success) {
            triggerToast({
              type: "error",
              title: "Review failed",
              description: response.message || "Please try again.",
            });
            return;
          }

          triggerToast({
            type: "success",
            title:
              status === "APPROVED" ? "Request accepted" : "Request rejected",
            description:
              response.message || "The department request was reviewed.",
          });
        },
        onError: (error: FetchError) => {
          triggerToast({
            type: "error",
            title: "Review failed",
            description: error.data?.message || "Internal Server Error",
          });
        },
      },
    );
  };

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
            Department requests
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Review student and teacher requests to join a department.
          </p>
        </div>

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
      </header>

      {departments.length === 0 ? (
        <div className="rounded-lg border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
          Create a department before reviewing join requests.
        </div>
      ) : (
        <DepartmentRequestsTabs
          students={applicants?.students ?? []}
          teachers={applicants?.teachers ?? []}
          isError={isError}
          isLoading={isLoading}
          isPending={isPending}
          onRetry={() => void refetch()}
          onReview={handleReview}
        />
      )}
    </section>
  );
}
