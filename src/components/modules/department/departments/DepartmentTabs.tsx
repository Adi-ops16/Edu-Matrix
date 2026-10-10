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

  const { myDepartments, joinDepartments } = useMemo(() => {
    if (!departments.length) return { myDepartments: [], joinDepartments: [] };

    const idSet = new Set(myDepartmentIds);
    const my: typeof departments = [];
    const join: typeof departments = [];

    for (const dept of departments) {
      if (idSet.has(dept.id)) {
        my.push(dept);
      } else {
        join.push(dept);
      }
    }

    return { myDepartments: my, joinDepartments: join };
  }, [departments, myDepartmentIds]);

  const hasMyDepartments = myDepartments.length > 0;
  const hasJoinDepartments = joinDepartments.length > 0;
  const availableTabs = [
    ...(hasMyDepartments ? ["my-departments"] : []),
    ...(hasJoinDepartments ? ["join-departments"] : []),
    "all-departments",
  ];
  const [selectedTab, setSelectedTab] = useState(
    hasMyDepartments ? "my-departments" : "all-departments",
  );
  const activeTab = availableTabs.includes(selectedTab)
    ? selectedTab
    : hasMyDepartments
      ? "my-departments"
      : "all-departments";

  return (
    <>
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          if (typeof value === "string" && availableTabs.includes(value)) {
            setSelectedTab(value);
          }
        }}
        className="w-full min-w-0 items-start"
      >
        <TabsList className="self-start justify-start">
          {hasMyDepartments && (
            <TabsTrigger value="my-departments">My Departments</TabsTrigger>
          )}
          {hasJoinDepartments && (
            <TabsTrigger value="join-departments">Join Departments</TabsTrigger>
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
        {hasJoinDepartments && (
          <TabsContent value="join-departments" className="w-full min-w-0">
            <div className="w-full min-w-0 overflow-x-auto">
              <DepartmentsTable
                departments={joinDepartments}
                refetch={refetch}
                setJoinDepartment={setJoinDepartment}
                setDescriptionDepartment={setDescriptionDepartment}
              />
            </div>
            <DepartmentDescriptionDialog
              descriptionDepartment={descriptionDepartment}
              setDescriptionDepartment={setDescriptionDepartment}
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
      <JoinDepartmentDialog
        setJoinDepartment={setJoinDepartment}
        department={joinDepartment}
      />
    </>
  );
}
