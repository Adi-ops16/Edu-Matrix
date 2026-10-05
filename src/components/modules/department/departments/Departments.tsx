"use client";

import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import UpdateDepartmentModal from "@/components/modals/UpdateDepartmentModal";
import { Button } from "@/components/ui/button";
import { useGetDepartments } from "@/hooks";
import type { Department } from "@/types";
import DepartmentDescriptionDialog from "./DepartmentDescriptionDialog";
import DepartmentsTable from "./DepartmentsTable";

export default function Departments() {
  const { data, refetch } = useGetDepartments();
  const departments = data.data ?? [];

  const [descriptionDepartment, setDescriptionDepartment] =
    useState<Department | null>(null);
  const [departmentToUpdate, setDepartmentToUpdate] =
    useState<Department | null>(null);

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
            Departments
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage the departments in your institution.
          </p>
        </div>
        <Link href="/institution_admin/create-department">
          <Button>
            <IconPlus aria-hidden="true" />
            Create department
          </Button>
        </Link>
      </header>

      <div className="overflow-hidden rounded-lg border bg-card">
        <DepartmentsTable
          setDescriptionDepartment={setDescriptionDepartment}
          setDepartmentToUpdate={setDepartmentToUpdate}
          refetch={refetch}
          departments={departments}
        />
      </div>

      <DepartmentDescriptionDialog
        descriptionDepartment={descriptionDepartment}
        setDescriptionDepartment={setDescriptionDepartment}
      />

      {departmentToUpdate && (
        <UpdateDepartmentModal
          department={departmentToUpdate}
          open
          onOpenChange={(open) => {
            if (!open) setDepartmentToUpdate(null);
          }}
        />
      )}
    </section>
  );
}
