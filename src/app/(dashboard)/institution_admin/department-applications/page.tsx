import { Suspense } from "react";
import JoinDepartment from "@/components/modules/department/join-department/JoinDepartment";
import TableSkeleton from "@/components/shared/TableSkeleton";

export default function DepartmentJoiningApplicationsPage() {
  return (
    <Suspense fallback={<TableSkeleton columns={5} />}>
      <JoinDepartment />
    </Suspense>
  );
}
