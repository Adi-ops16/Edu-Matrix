"use client";

import { Suspense, useState } from "react";
import SearchInput from "@/components/shared/SearchInput";
import TableSkeleton from "@/components/shared/TableSkeleton";
import useDebounce from "@/hooks/debounce.hook";
import InstitutionStudentsTable from "./InstitutionStudentsTable";

export default function InstitutionStudents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const debouncedTerm = useDebounce(searchTerm);

  const studentSearchQuery = {
    page,
    limit: 10,
    name: debouncedTerm,
    email: debouncedTerm,
  };

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex justify-between items-center">
        <div className="flex-1">
          <h1 className="mt-1 font-heading text-2xl font-semibold sm:text-3xl">
            Students
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse enrolled students and review their academic and contact
            details.
          </p>
        </div>
        <div className="flex-1">
          <SearchInput
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            value={searchTerm}
            placeholder="Search by name and email"
          />
        </div>
      </header>
      <Suspense fallback={<TableSkeleton columns={6} />}>
        <InstitutionStudentsTable
          params={studentSearchQuery}
          page={page}
          handlePageChange={setPage}
        />
      </Suspense>
    </section>
  );
}
