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
import type { InstitutionTeachers } from "@/types";
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

export default function InstitutionTeachersSheet({
  teacher,
}: {
  teacher: Omit<InstitutionTeachers, "teacher"> & {
    teacher?: InstitutionTeachers["teacher"] | null;
  };
}) {
  const details = teacher.teacher;

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
              <AvatarImage src={teacher.profile_url ?? ""} alt="" />
              <AvatarFallback>{getInitials(teacher.name)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <SheetTitle className="truncate">{teacher.name}</SheetTitle>
              <SheetDescription className="break-all">
                {teacher.email}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>
        <div className="px-4 pb-6">
          <h3 className="mb-2 text-sm font-semibold">Teacher details</h3>
          {details ? (
            <dl>
              <Detail label="Teacher ID">{details.teacher_id}</Detail>
              <Detail label="Designation">
                {details.designation || "Not provided"}
              </Detail>
              <Detail label="Degree">
                {details.degree || "Not provided"}
              </Detail>
              <Detail label="Specialization">
                {details.specialization || "Not provided"}
              </Detail>
              <Detail label="Graduated from">
                {details.graduated_from || "Not provided"}
              </Detail>
              <Detail label="Graduation year">
                {details.graduation_year || "Not provided"}
              </Detail>
              <Detail label="Joining year">
                {details.joining_year || "Not provided"}
              </Detail>
              <Detail label="Date of birth">
                {formatDate(details.date_of_birth)}
              </Detail>
              <Detail label="Gender">
                {details.gender
                  ? details.gender.charAt(0) +
                    details.gender.slice(1).toLowerCase()
                  : "Not provided"}
              </Detail>
              <Detail label="Phone">{details.phone || "Not provided"}</Detail>
              <Detail label="Address">
                {details.address || "Not provided"}
              </Detail>
              <Detail label="Bio">{details.bio || "Not provided"}</Detail>
              <Detail label="Certificate">
                {details.certificate_url ? (
                  <a
                    href={details.certificate_url}
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
          ) : (
            <p className="rounded-md border bg-muted/40 p-4 text-sm text-muted-foreground">
              Teacher details are not available.
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
