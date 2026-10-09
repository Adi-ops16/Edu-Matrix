"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { Suspense } from "react";
import MyPagination from "@/components/shared/Pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetDepartmentStudents, useGetDepartmentTeachers } from "@/hooks";
import type { Query } from "@/types";
import getInitials from "@/utils/getInitials";
import DepartmentMembersSheet from "./DepartmentMembersSheet";

type DepartmentMembersTableProps = {
  role: "STUDENT" | "TEACHER";
  departmentId: string;
  query: Query;
  page: number;
  handlePageChange: Dispatch<SetStateAction<number>>;
  fallback: ReactNode;
};

function StudentsTable({
  departmentId,
  query,
  page,
  handlePageChange,
}: Omit<DepartmentMembersTableProps, "role" | "fallback">) {
  const { data } = useGetDepartmentStudents(departmentId, query);
  const students = data?.data ?? [];
  return (
    <div className="space-y-5">
      <div className="w-full overflow-x-auto rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="min-w-56">Student</TableHead>
              <TableHead className="min-w-56">Email</TableHead>
              <TableHead className="min-w-32">Student ID</TableHead>
              <TableHead className="min-w-32">Admission year</TableHead>
              <TableHead className="min-w-32">Graduation year</TableHead>
              <TableHead className="min-w-24 text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  No students found in this department.
                </TableCell>
              </TableRow>
            ) : (
              students.map((student) => {
                const details = student?.student;
                return (
                  <TableRow
                    key={`${student.email}-${details?.student_id ?? "student"}`}
                  >
                    <TableCell>
                      <MemberIdentity
                        name={student.name}
                        profileUrl={student.profile_url}
                      />
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell className="font-mono text-xs">
                      {details?.student_id ?? "Not provided"}
                    </TableCell>
                    <TableCell>
                      {details?.admission_year ?? "Not provided"}
                    </TableCell>
                    <TableCell>
                      {details?.graduation_year ?? "Not provided"}
                    </TableCell>
                    <TableCell className="text-right">
                      <DepartmentMembersSheet
                        {...{ role: "STUDENT", student }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      <MyPagination
        page={page}
        totalPages={data?.meta?.totalPages ?? 1}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

function TeachersTable({
  departmentId,
  query,
  page,
  handlePageChange,
}: Omit<DepartmentMembersTableProps, "role" | "fallback">) {
  const { data } = useGetDepartmentTeachers(departmentId, query);
  const teachers = data?.data ?? [];

  return (
    <div className="space-y-5">
      <div className="w-full overflow-x-auto rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="min-w-56">Teacher</TableHead>
              <TableHead className="min-w-56">Email</TableHead>
              <TableHead className="min-w-40">Designation</TableHead>
              <TableHead className="min-w-44">Specialization</TableHead>
              <TableHead className="min-w-32">Joining year</TableHead>
              <TableHead className="min-w-24 text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  No teachers found in this department.
                </TableCell>
              </TableRow>
            ) : (
              teachers.map((teacher) => {
                const details = teacher?.teacher;
                return (
                  <TableRow
                    key={`${teacher.email}-${details?.teacher_id ?? "teacher"}`}
                  >
                    <TableCell>
                      <MemberIdentity
                        name={teacher.name}
                        profileUrl={teacher.profile_url}
                      />
                    </TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>
                      {details?.designation || "Not provided"}
                    </TableCell>
                    <TableCell>
                      {details?.specialization || "Not provided"}
                    </TableCell>
                    <TableCell>
                      {details?.joining_year ?? "Not provided"}
                    </TableCell>
                    <TableCell className="text-right">
                      <DepartmentMembersSheet
                        {...{ role: "TEACHER", teacher }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      <MyPagination
        page={page}
        totalPages={data?.meta?.totalPages ?? 1}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

function MemberIdentity({
  name,
  profileUrl,
}: {
  name: string;
  profileUrl: string | null;
}) {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={profileUrl ?? ""} alt="" />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      <span className="font-medium">{name}</span>
    </div>
  );
}

export default function DepartmentMembersTable({
  role,
  fallback,
  ...props
}: DepartmentMembersTableProps) {
  return (
    <Suspense fallback={fallback}>
      {role === "STUDENT" ? (
        <StudentsTable {...props} />
      ) : (
        <TeachersTable {...props} />
      )}
    </Suspense>
  );
}
