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
import { useGetInstitutionTeachers } from "@/hooks";
import type { Query } from "@/types";
import getInitials from "@/utils/getInitials";
import InstitutionTeachersSheet from "./InstitutionTeachersSheet";

export default function InstitutionTeachersTable({
  query,
  page,
  handlePageChange,
}: {
  query: Query;
  page: number;
  handlePageChange: Dispatch<SetStateAction<number>>;
}) {
  const { data } = useGetInstitutionTeachers(query);
  const teachers = data.data ?? [];

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="min-w-64">Teacher</TableHead>
              <TableHead className="min-w-56">Email</TableHead>
              <TableHead className="min-w-40">Designation</TableHead>
              <TableHead className="min-w-44">Specialization</TableHead>
              <TableHead className="min-w-32">Joining year</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.teacher.teacher_id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={teacher.profile_url ?? ""} alt="" />
                      <AvatarFallback>
                        {getInitials(teacher.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{teacher.name}</span>
                  </div>
                </TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>
                  {teacher.teacher.designation || "Not provided"}
                </TableCell>
                <TableCell>
                  {teacher.teacher.specialization || "Not provided"}
                </TableCell>
                <TableCell>
                  {teacher.teacher.joining_year || "Not provided"}
                </TableCell>
                <TableCell className="text-right">
                  <InstitutionTeachersSheet teacher={teacher} />
                </TableCell>
              </TableRow>
            ))}
            {teachers.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  No teachers are found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <MyPagination
        page={page}
        totalPages={data.meta?.totalPages ?? 1}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
