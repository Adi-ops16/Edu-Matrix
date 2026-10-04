import { Suspense } from "react";
import JoiningApplication from "@/components/modules/pending-applications/JoiningApplication";
import TableSkeleton from "@/components/shared/TableSkeleton";

export default function ApplicationsPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header>
        <h1 className="mt-1 font-heading text-2xl font-semibold sm:text-3xl">
          Application
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Review pending applications inspect their contact and registration
          details.
        </p>
      </header>
      <Suspense fallback={<TableSkeleton columns={6} />}>
        <JoiningApplication />
      </Suspense>
    </section>
  );
}
