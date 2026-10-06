"use client";

import { useMemo, useState } from "react";
import JoinDepartmentDialog from "@/components/modals/JoinDepartmentDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetDepartments } from "@/hooks";
import type { Department } from "@/types";
import DepartmentDescriptionDialog from "./DepartmentDescriptionDialog";
import DepartmentsTable from "./DepartmentsTable";

export default function DepartmentTabs() {
  const [descriptionDepartment, setDescriptionDepartment] =
    useState<Department | null>(null);
  const [joinDepartment, setJoinDepartment] = useState<Department | null>(null);

  const { data, refetch } = useGetDepartments();

  const departments = data?.data?.departments ?? [];
  const myDepartmentIds = data?.data?.myDepartmentsIds ?? [];

  const { myDepartments, otherDepartments } = useMemo(() => {
    if (!departments.length) return { myDepartments: [], otherDepartments: [] };

    const idSet = new Set(myDepartmentIds);
    const my: typeof departments = [];
    const other: typeof departments = [];

    for (const dept of departments) {
      if (idSet.has(dept.id)) {
        my.push(dept);
      } else {
        other.push(dept);
      }
    }

    return { myDepartments: my, otherDepartments: other };
  }, [departments, myDepartmentIds]);

  const hasMyDepartments = myDepartments.length > 0;
  const hasOtherDepartments = otherDepartments.length > 0;

  return (
    <Tabs
      defaultValue={`${hasMyDepartments ? "my-departments" : "all-departments"}`}
      className="w-full min-w-0 items-start"
    >
      <TabsList className="self-start justify-start">
        {hasMyDepartments && (
          <TabsTrigger value="my-departments">My Departments</TabsTrigger>
        )}
        {hasOtherDepartments && (
          <TabsTrigger value="other-departments">Other Departments</TabsTrigger>
        )}
        <TabsTrigger value="all-departments">All Departments</TabsTrigger>
      </TabsList>
      {hasMyDepartments && (
        <TabsContent value="my-departments" className="w-full min-w-0">
          <div className="w-full min-w-0 overflow-x-auto">
            <DepartmentsTable
              departments={myDepartments}
              refetch={refetch}
              setDescriptionDepartment={setDescriptionDepartment}
            />
          </div>
          <DepartmentDescriptionDialog
            descriptionDepartment={descriptionDepartment}
            setDescriptionDepartment={setDescriptionDepartment}
          />
        </TabsContent>
      )}
      {hasOtherDepartments && (
        <TabsContent value="other-departments" className="w-full min-w-0">
          <div className="w-full min-w-0 overflow-x-auto">
            <DepartmentsTable
              departments={otherDepartments}
              refetch={refetch}
              setJoinDepartment={setJoinDepartment}
              setDescriptionDepartment={setDescriptionDepartment}
            />
          </div>
          <DepartmentDescriptionDialog
            descriptionDepartment={descriptionDepartment}
            setDescriptionDepartment={setDescriptionDepartment}
          />
          <JoinDepartmentDialog
            setJoinDepartment={setJoinDepartment}
            department={joinDepartment}
          />
        </TabsContent>
      )}
      <TabsContent value="all-departments" className="w-full min-w-0">
        <div className="w-full min-w-0 overflow-x-auto">
          <DepartmentsTable
            departments={departments}
            refetch={refetch}
            setDescriptionDepartment={setDescriptionDepartment}
          />
        </div>
        <DepartmentDescriptionDialog
          descriptionDepartment={descriptionDepartment}
          setDescriptionDepartment={setDescriptionDepartment}
        />
      </TabsContent>
    </Tabs>
  );
}
