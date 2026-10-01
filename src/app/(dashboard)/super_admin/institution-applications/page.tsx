import { Suspense } from "react";
import ApplicationTable from "@/components/modules/institution-applications/ApplicationTable";
import TableSkeleton from "@/components/shared/TableSkeleton";

export default function InstitutionApplicationsPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header>
        <h1 className="mt-1 font-heading text-2xl font-semibold sm:text-3xl">
          Institution applications
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Review institution applications and decide whether to approve them.
        </p>
      </header>
      <Suspense fallback={<TableSkeleton columns={7} />}>
        <ApplicationTable />
      </Suspense>
    </section>
  );
}
