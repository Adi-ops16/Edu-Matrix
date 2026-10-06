import { IconCheck, IconX } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DepartmentJoinRequest } from "@/types";
import getInitials from "@/utils/getInitials";

export type DepartmentRequestReviewStatus = "APPROVED" | "DECLINED";

export default function DepartmentRequestsTable({
  applicants,
  applicantRole,
  isError,
  isLoading,
  isPending,
  onRetry,
  onReview,
}: {
  applicants: DepartmentJoinRequest[];
  applicantRole: DepartmentJoinRequest["role"];
  isError: boolean;
  isLoading: boolean;
  isPending: boolean;
  onRetry: () => void;
  onReview: (
    applicant: DepartmentJoinRequest,
    status: DepartmentRequestReviewStatus,
  ) => void;
}) {
  const columns = 5;

  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="min-w-56">Name</TableHead>
            <TableHead className="min-w-28">Gender</TableHead>
            <TableHead className="min-w-36">Date of birth</TableHead>
            <TableHead className="min-w-56">Address</TableHead>
            <TableHead className="min-w-52 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow key={crypto.randomUUID()}>
              <TableCell colSpan={columns} className="h-32 text-center">
                <span className="inline-flex items-center gap-2 text-muted-foreground">
                  <Spinner /> Loading requests...
                </span>
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={columns} className="h-32 text-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <span>Couldn&apos;t load department requests.</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onRetry}
                  >
                    Try again
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ) : applicants.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns}
                className="h-32 text-center text-muted-foreground"
              >
                No {applicantRole.toLowerCase()} requests to review.
              </TableCell>
            </TableRow>
          ) : (
            applicants.map((applicant) => {
              return (
                <TableRow key={crypto.randomUUID()}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={applicant.profile_url ?? ""} alt="" />
                        <AvatarFallback>
                          {getInitials(applicant.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{applicant.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{applicant.gender || "Not provided"}</TableCell>
                  <TableCell>
                    {applicant.date_of_birth
                      ? applicant.date_of_birth.slice(0, 10)
                      : "Not provided"}
                  </TableCell>
                  <TableCell className="max-w-sm whitespace-normal">
                    {applicant.address || "Not provided"}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        size="sm"
                        disabled={isPending}
                        onClick={() => onReview(applicant, "APPROVED")}
                      >
                        <IconCheck aria-hidden="true" /> Accept
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        disabled={isPending}
                        onClick={() => onReview(applicant, "DECLINED")}
                      >
                        <IconX aria-hidden="true" />
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
