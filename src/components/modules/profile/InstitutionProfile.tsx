import {
  IconBuilding,
  IconCheck,
  IconMail,
  IconMapPin,
  IconPhone,
  IconWorld,
} from "@tabler/icons-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { UserProfile } from "@/types";
import Detail from "./ProfileItemDetail";

export default function InstitutionProfile({
  profile,
}: {
  profile: UserProfile;
}) {
  const institution = profile.institution;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Institution</CardTitle>
        <CardDescription>
          Institution associated with this account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!institution ? (
          <p className="text-sm text-muted-foreground">
            No institution is associated with this account.
          </p>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-heading text-lg font-semibold">
                {institution.name}
              </h3>
              <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                {institution.code}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                <IconCheck className="size-3.5" aria-hidden="true" />
                {institution.status}
              </span>
            </div>
            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              <Detail
                icon={IconBuilding}
                label="Established"
                value={institution.established_year}
              />
              <Detail
                icon={IconMapPin}
                label="Location"
                value={[institution.address, institution.city]
                  .filter(Boolean)
                  .join(", ")}
              />
              <Detail
                icon={IconMail}
                label="Contact email"
                value={institution.contact_email}
              />
              <Detail
                icon={IconPhone}
                label="Contact number"
                value={institution.contact_number}
              />
              <Detail
                icon={IconWorld}
                label="Website"
                value={institution.website}
              />
            </div>
            {institution.description && (
              <div className="border-t pt-5">
                <p className="text-xs font-medium text-muted-foreground">
                  About the institution
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6">
                  {institution.description}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
