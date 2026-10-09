"use client";

import { IconSearch } from "@tabler/icons-react";
import { Suspense, useState } from "react";
import DepartmentSelect from "@/components/shared/DepartmentSelect";
import SearchInput from "@/components/shared/SearchInput";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { useGetDepartments } from "@/hooks";
import useDebounce from "@/hooks/debounce.hook";
import DepartmentMembersTabs from "./DepartmentMembersTabs";

export default function DepartmentMembers() {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [activeTab, setActiveTab] = useState<"students" | "teachers">(
    "students",
  );
  const [studentSearch, setStudentSearch] = useState("");
  const [teacherSearch, setTeacherSearch] = useState("");
  const [studentPage, setStudentPage] = useState(1);
  const [teacherPage, setTeacherPage] = useState(1);
  const debouncedStudentSearch = useDebounce(studentSearch);
  const debouncedTeacherSearch = useDebounce(teacherSearch);
  const { data: departmentResponse } = useGetDepartments();
  const departments = departmentResponse?.data?.departments ?? [];
  const activeDepartmentId =
    departments.find((department) => department.id === selectedDepartmentId)
      ?.id ??
    departments[0]?.id ??
    "";

  const activeSearch = activeTab === "students" ? studentSearch : teacherSearch;

  const studentQuery = {
    limit: 10,
    page: studentPage,
    searchTerm: debouncedStudentSearch,
  };
  const teacherQuery = {
    limit: 10,
    page: teacherPage,
    searchTerm: debouncedTeacherSearch,
  };

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header>
        <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
          Department members
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Browse students and teachers in a department, search member profiles,
          and review their details.
        </p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row">
        <DepartmentSelect
          departments={departments}
          setSelectedDepartmentId={(departmentId) => {
            setSelectedDepartmentId(departmentId);
            setStudentPage(1);
            setTeacherPage(1);
          }}
          activeDepartmentId={activeDepartmentId}
        />
        <div className="relative w-full sm:max-w-sm">
          <IconSearch
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <SearchInput
            className="pl-9"
            placeholder={`Search ${activeTab} by name or email`}
            aria-label={`Search ${activeTab} by name or email`}
            value={activeSearch}
            onChange={(event) => {
              if (activeTab === "students") {
                setStudentSearch(event.target.value);
                setStudentPage(1);
              } else {
                setTeacherSearch(event.target.value);
                setTeacherPage(1);
              }
            }}
          />
        </div>
      </div>

      {departments.length === 0 ? (
        <div className="rounded-lg border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
          Create a department before viewing department members.
        </div>
      ) : (
        <Suspense fallback={<TableSkeleton columns={6} />}>
          <DepartmentMembersTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            departmentId={activeDepartmentId}
            studentQuery={studentQuery}
            teacherQuery={teacherQuery}
            studentPage={studentPage}
            teacherPage={teacherPage}
            setStudentPage={setStudentPage}
            setTeacherPage={setTeacherPage}
          />
        </Suspense>
      )}
    </section>
  );
}
