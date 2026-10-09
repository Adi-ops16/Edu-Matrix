import type { Dispatch, SetStateAction } from "react";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Query } from "@/types";
import DepartmentMembersTable from "./DepartmentMembersTable";

export default function DepartmentMembersTabs({
  activeTab,
  setActiveTab,
  departmentId,
  studentQuery,
  teacherQuery,
  studentPage,
  teacherPage,
  setStudentPage,
  setTeacherPage,
}: {
  activeTab: "students" | "teachers";
  setActiveTab: Dispatch<SetStateAction<"students" | "teachers">>;
  departmentId: string;
  studentQuery: Query;
  teacherQuery: Query;
  studentPage: number;
  teacherPage: number;
  setStudentPage: Dispatch<SetStateAction<number>>;
  setTeacherPage: Dispatch<SetStateAction<number>>;
}) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => {
        if (value === "students" || value === "teachers") {
          setActiveTab(value);
        }
      }}
      className="w-full min-w-0 items-start"
    >
      <TabsList className="grid h-10 w-full grid-cols-2 sm:w-80">
        <TabsTrigger value="students">Students</TabsTrigger>
        <TabsTrigger value="teachers">Teachers</TabsTrigger>
      </TabsList>
      <TabsContent value="students" className="w-full min-w-0">
        <DepartmentMembersTable
          {...{ role: "STUDENT" }}
          departmentId={departmentId}
          query={studentQuery}
          page={studentPage}
          handlePageChange={setStudentPage}
          fallback={<TableSkeleton columns={6} />}
        />
      </TabsContent>
      <TabsContent value="teachers" className="w-full min-w-0">
        <DepartmentMembersTable
          {...{ role: "TEACHER" }}
          departmentId={departmentId}
          query={teacherQuery}
          page={teacherPage}
          handlePageChange={setTeacherPage}
          fallback={<TableSkeleton columns={6} />}
        />
      </TabsContent>
    </Tabs>
  );
}
