import {
  IconCalendar,
  IconCertificate,
  IconEdit,
  IconExternalLink,
  IconGenderBigender,
  IconMapPin,
  IconPhone,
  IconSchool,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TeacherDetails } from "@/types";
import formatDate from "@/utils/formatDate";
import Detail from "./ProfileItemDetail";

export default function TeacherProfile({
  teacher,
}: {
  teacher: TeacherDetails | null;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Teaching details</CardTitle>
        <CardDescription>Professional and personal information</CardDescription>
        <CardAction>
          <Button type="button" variant="outline" size="sm">
            <IconEdit aria-hidden="true" />
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {!teacher ? (
          <p className="text-sm text-muted-foreground">
            Teacher details have not been added yet.
          </p>
        ) : (
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            <Detail
              icon={IconCertificate}
              label="Teacher ID"
              value={teacher.teacher_id}
            />
            <Detail
              icon={IconSchool}
              label="Designation"
              value={teacher.designation}
            />
            <Detail icon={IconSchool} label="Degree" value={teacher.degree} />
            <Detail
              icon={IconSchool}
              label="Specialization"
              value={teacher.specialization}
            />
            <Detail
              icon={IconSchool}
              label="Graduated from"
              value={teacher.graduated_from}
            />
            <Detail
              icon={IconCalendar}
              label="Graduation year"
              value={teacher.graduation_year}
            />
            <Detail
              icon={IconCalendar}
              label="Joining year"
              value={teacher.joining_year}
            />
            <Detail
              icon={IconCalendar}
              label="Date of birth"
              value={formatDate(teacher.date_of_birth)}
            />
            <Detail
              icon={IconGenderBigender}
              label="Gender"
              value={teacher.gender}
            />
            <Detail icon={IconPhone} label="Phone" value={teacher.phone} />
            <Detail icon={IconMapPin} label="Address" value={teacher.address} />
          </div>
        )}
        {teacher?.bio && (
          <div className="mt-7 border-t pt-5">
            <p className="text-xs font-medium text-muted-foreground">About</p>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6">
              {teacher.bio}
            </p>
          </div>
        )}
        {teacher?.certificate_url && (
          <a
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
            href={teacher.certificate_url}
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
