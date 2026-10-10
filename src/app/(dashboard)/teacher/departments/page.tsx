import { Suspense } from "react";
import DepartmentTabs from "@/components/modules/department/departments/DepartmentTabs";
import TableSkeleton from "@/components/shared/TableSkeleton";

export default function TeacherDepartmentsPage() {
  return (
    <div className="mx-auto my-8 w-full max-w-7xl space-y-5 px-4 sm:px-6 lg:px-8">
      <header>
        <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
          Departments
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Browse departments in your institution, see your memberships, and
          request to join another department.
        </p>
      </header>
      <Suspense fallback={<TableSkeleton columns={5} />}>
        <DepartmentTabs />
      </Suspense>
    </div>
  );
}
