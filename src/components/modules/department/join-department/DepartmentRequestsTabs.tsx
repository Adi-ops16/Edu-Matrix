import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DepartmentJoinRequest } from "@/types";
import DepartmentRequestsTable, {
  type DepartmentRequestReviewStatus,
} from "./DepartmentRequestsTable";

export default function DepartmentRequestsTabs({
  students,
  teachers,
  isError,
  isPending,
  onRetry,
  isLoading,
  onReview,
}: {
  students: DepartmentJoinRequest[];
  teachers: DepartmentJoinRequest[];
  isLoading: boolean;
  isError: boolean;
  isPending: boolean;
  onRetry: () => void;
  onReview: (
    applicant: DepartmentJoinRequest,
    status: DepartmentRequestReviewStatus,
  ) => void;
}) {
  return (
    <Tabs defaultValue="students" className="w-full min-w-0 items-start">
      <TabsList className="self-start justify-start">
        <TabsTrigger value="students">Students</TabsTrigger>
        <TabsTrigger value="teachers">Teachers</TabsTrigger>
      </TabsList>
      <TabsContent value="students" className="w-full min-w-0">
        <DepartmentRequestsTable
          applicantRole="STUDENT"
          applicants={students}
          isLoading={isLoading}
          isError={isError}
          isPending={isPending}
          onRetry={onRetry}
          onReview={onReview}
        />
      </TabsContent>
      <TabsContent value="teachers" className="w-full min-w-0">
        <DepartmentRequestsTable
          applicantRole="TEACHER"
          isLoading={isLoading}
          applicants={teachers}
          isError={isError}
          isPending={isPending}
          onRetry={onRetry}
          onReview={onReview}
        />
      </TabsContent>
    </Tabs>
  );
}
