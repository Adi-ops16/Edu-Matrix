import {
  IconCalendar,
  IconExternalLink,
  IconGenderBigender,
  IconMapPin,
  IconPhone,
  IconSchool,
} from "@tabler/icons-react";
import StudentProfileEditModal from "@/components/modals/StudentProfileEditModal";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { StudentDetails } from "@/types";
import formatDate from "@/utils/formatDate";
import Detail from "./ProfileItemDetail";

export default function StudentProfile({
  student,
}: {
  student: StudentDetails | null;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student details</CardTitle>
        <CardDescription>Academic and personal information</CardDescription>
        <CardAction>
          <StudentProfileEditModal student={student} />
        </CardAction>
      </CardHeader>
      <CardContent>
        {!student ? (
          <p className="text-sm text-muted-foreground">
            Student details have not been added yet.
          </p>
        ) : (
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            <Detail
              icon={IconSchool}
              label="Student ID"
              value={student.student_id}
            />
            <Detail
              icon={IconCalendar}
              label="Admission year"
              value={student.admission_year}
            />
            <Detail
              icon={IconCalendar}
              label="Graduation year"
              value={student.graduation_year}
            />
            <Detail
              icon={IconCalendar}
              label="Date of birth"
              value={formatDate(student.date_of_birth)}
            />
            <Detail
              icon={IconGenderBigender}
              label="Gender"
              value={student.gender}
            />
            <Detail icon={IconPhone} label="Phone" value={student.phone} />
            <Detail icon={IconMapPin} label="Address" value={student.address} />
          </div>
        )}
        {student?.certificate_url && (
          <a
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
            href={student.certificate_url}
            target="_blank"
            rel="noreferrer"
          >
            <IconExternalLink className="size-4" aria-hidden="true" />
            View certificate
          </a>
        )}
      </CardContent>
    </Card>
  );
}
