"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetInstitutionApplications } from "@/hooks";
import type { Institution } from "@/types";
import ActionButtons from "./ActionButtons";

const statusStyles: Record<Institution["status"], string> = {
  APPROVED: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  PENDING: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  REJECTED: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
};

export default function ApplicationTable() {
  const { data } = useGetInstitutionApplications();
  const applications = data.data ?? [];

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="min-w-52">Institution</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Code</TableHead>
            <TableHead className="min-w-60">Contact</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="font-medium">{application.name}</TableCell>
              <TableCell>{application.city}</TableCell>
              <TableCell>
                <span className="rounded bg-muted px-2 py-1 font-mono text-xs">
                  {application.code}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span>{application.contact_email}</span>
                  <span className="text-xs text-muted-foreground">
                    {application.contact_number}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(application.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${statusStyles[application.status]}`}
                >
                  {application.status.toLowerCase()}
                </span>
              </TableCell>
              <TableCell className="text-right">
                {application.status === "PENDING" ? (
                  <ActionButtons application={application} />
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Reviewed
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
          {applications.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-32 text-center text-muted-foreground"
              >
                There are no institution applications to review.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
