"use client";

import type { Dispatch, SetStateAction } from "react";
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
import { useGetInstitutionStudents } from "@/hooks";
import type { Query } from "@/types";
import getInitials from "@/utils/getInitials";
import InstitutionStudentsDetailsSheet from "./InstitutionStudentsDetailsSheet";

export default function InstitutionStudentsTable({
  params,
  page,
  handlePageChange,
}: {
  params: Query;
  page: number;
  handlePageChange: Dispatch<SetStateAction<number>>;
}) {
  const { data } = useGetInstitutionStudents(params);
  const users = data.data ?? [];

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="min-w-64">Student</TableHead>
              <TableHead className="min-w-56">Email</TableHead>
              <TableHead className="min-w-32">Student ID</TableHead>
              <TableHead className="min-w-32">Admission year</TableHead>
              <TableHead className="min-w-32">Graduation year</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.student.student_id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.profile_url ?? ""} alt="" />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="font-mono text-xs">
                  {user.student.student_id}
                </TableCell>
                <TableCell>
                  {user.student.admission_year || "Not provided"}
                </TableCell>
                <TableCell>
                  {user.student.graduation_year || "Not provided"}
                </TableCell>
                <TableCell className="text-right">
                  <InstitutionStudentsDetailsSheet user={user} />
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  No students are found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <MyPagination
        page={page}
        totalPages={data.meta?.totalPages ? data.meta.totalPages : 1}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
