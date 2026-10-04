"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetJoiningApplications } from "@/hooks";
import getInitials from "@/utils/getInitials";
import ActionButtons from "./ActionButtons";

const statusStyles = {
  APPROVED: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  DECLINED: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
  NOT_JOINED: "bg-muted text-muted-foreground",
  PENDING: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
};

export default function JoiningApplication() {
  const { data } = useGetJoiningApplications();
  const users = data.data || [];

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="min-w-20">Photo</TableHead>
            <TableHead className="min-w-52">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <Avatar>
                  <AvatarImage src={user.profile_url ?? ""} />
                  <AvatarFallback> {getInitials(user.name)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>{user.role?.toLocaleLowerCase()}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${statusStyles[user.member_status]}`}
                >
                  {user.member_status.toLowerCase()}
                </span>
              </TableCell>
              <TableCell className="text-right">
                {user.member_status === "PENDING" ? (
                  <ActionButtons user={user} />
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Reviewed
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
          {users.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-32 text-center text-muted-foreground"
              >
                There is no user applications to review.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
