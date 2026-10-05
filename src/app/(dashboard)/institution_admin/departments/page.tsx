import { Suspense } from "react";
import Departments from "@/components/modules/department/departments/Departments";
import TableSkeleton from "@/components/shared/TableSkeleton";

export default function DepartmentsPage() {
  return (
    <Suspense fallback={<TableSkeleton columns={5} />}>
      <Departments />
    </Suspense>
  );
}
