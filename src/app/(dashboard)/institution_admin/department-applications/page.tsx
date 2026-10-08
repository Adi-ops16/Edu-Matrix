import { Suspense } from "react";
import JoinDepartment from "@/components/modules/department/join-department/JoinDepartment";
import TableSkeleton from "@/components/shared/TableSkeleton";

export default function DepartmentJoiningApplicationsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <TableSkeleton columns={5} />
        </div>
      }
    >
      <JoinDepartment />
    </Suspense>
  );
}
