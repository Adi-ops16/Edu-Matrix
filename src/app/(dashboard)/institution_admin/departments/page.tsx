import { Suspense } from "react";
import Departments from "@/components/modules/department/departments/Departments";
import TableSkeleton from "@/components/shared/TableSkeleton";

export default function DepartmentsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <TableSkeleton columns={5} />
        </div>
      }
    >
      <Departments />
    </Suspense>
  );
}
