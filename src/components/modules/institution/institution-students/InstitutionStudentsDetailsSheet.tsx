import type { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { InstitutionStudents } from "@/types";
import formatDate from "@/utils/formatDate";
import getInitials from "@/utils/getInitials";

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(7rem,0.8fr)_1.2fr] gap-4 border-b py-3 last:border-0">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="min-w-0 wrap-break-word text-sm font-medium">
        {children}
      </dd>
    </div>
  );
}

export default function InstitutionStudentsDetailsSheet({
  user,
}: {
  user: InstitutionStudents;
}) {
  const student = user.student;
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button type="button" variant="outline" size="sm">
            Details
          </Button>
        }
      />
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader className="border-b pr-12">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarImage src={user.profile_url ?? ""} alt="" />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <SheetTitle className="truncate">{user.name}</SheetTitle>
              <SheetDescription className="break-all">
                {user.email}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>
        <div className="px-4 pb-6">
          <h3 className="mb-2 text-sm font-semibold">Student details</h3>
          <dl>
            <Detail label="Student ID">{student.student_id}</Detail>
            <Detail label="Admission year">
              {student.admission_year || "Not provided"}
            </Detail>
            <Detail label="Graduation year">
              {student.graduation_year || "Not provided"}
            </Detail>
            <Detail label="Date of birth">
              {formatDate(student.date_of_birth)}
            </Detail>
            <Detail label="Gender">
              {student.gender
                ? student.gender.charAt(0) +
                  student.gender.slice(1).toLowerCase()
                : "Not provided"}
            </Detail>
            <Detail label="Phone">{student.phone || "Not provided"}</Detail>
            <Detail label="Address">{student.address || "Not provided"}</Detail>
            <Detail label="Certificate">
              {student.certificate_url ? (
                <a
                  href={student.certificate_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline underline-offset-4"
                >
                  View certificate
                </a>
              ) : (
                "Not provided"
              )}
            </Detail>
          </dl>
        </div>
      </SheetContent>
    </Sheet>
  );
}
