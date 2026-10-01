import { IconExternalLink } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Institution } from "@/types";
import { formatTimestamp } from "@/utils/formatDate";

function Detail({
  label,
  value,
  className,
}: {
  label: string;
  value: string | number | null | undefined;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 wrap-break-word text-sm font-medium">
        {value === null || value === undefined || value === ""
          ? "Not provided"
          : value}
      </dd>
    </div>
  );
}

export default function InstitutionDetailsDialog({
  institution,
}: {
  institution: Institution;
}) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button type="button" variant="outline" size="sm">
            Details
          </Button>
        }
      />
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{institution.name}</DialogTitle>
          <DialogDescription>
            Institution record and contact information.
          </DialogDescription>
        </DialogHeader>
        <dl className="grid gap-x-8 gap-y-5 py-2 sm:grid-cols-2">
          <Detail label="Institution ID" value={institution.id} />
          <Detail label="Institution code" value={institution.code} />
          <Detail label="Status" value={institution.status} />
          <Detail
            label="Established year"
            value={institution.established_year}
          />
          <Detail label="City" value={institution.city} />
          <Detail label="Address" value={institution.address} />
          <Detail label="Contact email" value={institution.contact_email} />
          <Detail label="Contact number" value={institution.contact_number} />
          <Detail label="Created by" value={institution.created_by} />
          <Detail label="Reviewed by" value={institution.reviewed_by} />
          <Detail
            label="Created"
            value={formatTimestamp(institution.created_at)}
          />
          <Detail
            label="Last updated"
            value={formatTimestamp(institution.updated_at)}
          />
          <Detail
            label="Description"
            value={institution.description}
            className="sm:col-span-2"
          />
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium text-muted-foreground">
              Website
            </dt>
            <dd className="mt-1 text-sm font-medium">
              {institution.website ? (
                <a
                  href={institution.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary underline-offset-4 hover:underline"
                >
                  {institution.website}
                  <IconExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              ) : (
                "Not provided"
              )}
            </dd>
          </div>
        </dl>
      </DialogContent>
    </Dialog>
  );
}
