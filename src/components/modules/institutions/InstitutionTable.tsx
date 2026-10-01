"use client";

import InstitutionDetailsDialog from "@/components/modules/institutions/InstitutionDetailsDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetInstitutionsSuspense } from "@/hooks";
import type { Institution } from "@/types";

const statusStyles: Record<Institution["status"], string> = {
  APPROVED: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  PENDING: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  REJECTED: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
};

export default function InstitutionTable() {
  const { data } = useGetInstitutionsSuspense();
  const institutions = data.data ?? [];

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="min-w-52">Institution</TableHead>
            <TableHead>City</TableHead>
            <TableHead className="min-w-60">Contact</TableHead>
            <TableHead>Established</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {institutions.map((institution) => (
            <TableRow key={institution.id}>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-medium">{institution.name}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {institution.code}
                  </span>
                </div>
              </TableCell>
              <TableCell>{institution.city}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span>{institution.contact_email}</span>
                  <span className="text-xs text-muted-foreground">
                    {institution.contact_number}
                  </span>
                </div>
              </TableCell>
              <TableCell>{institution.established_year}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${statusStyles[institution.status]}`}
                >
                  {institution.status.toLowerCase()}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <InstitutionDetailsDialog institution={institution} />
              </TableCell>
            </TableRow>
          ))}
          {institutions.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-32 text-center text-muted-foreground"
              >
                No institutions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
