import { Suspense } from "react";
import DepartmentTabs from "@/components/modules/department/departments/DepartmentTabs";
import TableSkeleton from "@/components/shared/TableSkeleton";

export default function DepartmentsPage() {
  return (
    <div className="mx-5 my-10 space-y-5">
      <div>
        <h1 className="text-primary text-2xl font-bold">Departments</h1>
        <p className="dark:text-white/50 text-black/70">
          walkthrough your department details from one place
        </p>
      </div>
      <Suspense fallback={<TableSkeleton columns={6} />}>
        <DepartmentTabs />
      </Suspense>
    </div>
  );
}
