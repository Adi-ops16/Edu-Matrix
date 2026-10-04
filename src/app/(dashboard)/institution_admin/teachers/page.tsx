"use client";
import { Suspense, useState } from "react";
import InstitutionTeachersTable from "@/components/modules/institution/institution.teachers/InstitutionTeachersTable";
import SearchInput from "@/components/shared/SearchInput";
import TableSkeleton from "@/components/shared/TableSkeleton";
import useDebounce from "@/hooks/debounce.hook";

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedTerm = useDebounce(searchTerm);
  const query = {
    page: "1",
    limit: "10",
    name: debouncedTerm,
    email: debouncedTerm,
  };
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex justify-between items-center">
        <div className="flex-1">
          <h1 className="mt-1 font-heading text-2xl font-semibold sm:text-3xl">
            Teachers
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse the institution&apos;s teaching staff and review their
            profiles.
          </p>
        </div>
        <div className="flex-1">
          <SearchInput
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="Search by name and email"
          />
        </div>
      </header>
      <Suspense fallback={<TableSkeleton columns={6} />}>
        <InstitutionTeachersTable query={query} />
      </Suspense>
    </section>
  );
}
