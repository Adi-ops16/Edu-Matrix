import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { CourseDetails } from "@/types";
import formatDate from "@/utils/formatDate";

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[minmax(7rem,0.8fr)_1.2fr] gap-4 border-b py-3 last:border-0">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="min-w-0 wrap-break-word text-sm font-medium">{value}</dd>
    </div>
  );
}

export default function CourseDetailsSheet({
  details,
}: {
  details: CourseDetails;
}) {
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
          <SheetTitle>Course offering details</SheetTitle>
          <SheetDescription>
            Batch {details.batch} · {details.semester}
          </SheetDescription>
        </SheetHeader>
        <dl className="px-4 pb-6">
          <Detail label="Offering ID" value={String(details.id)} />
          <Detail label="Course ID" value={details.course_id} />
          <Detail label="Semester" value={details.semester} />
          <Detail label="Batch" value={details.batch} />
          <Detail
            label="Start date"
            value={formatDate(details.start_date) || "Not set"}
          />
          <Detail
            label="End date"
            value={formatDate(details.end_date) || "Not set"}
          />
          <Detail label="Status" value={details.status} />
          <Detail
            label="Price"
            value={`${details.price} ${details.currency}`}
          />
        </dl>
      </SheetContent>
    </Sheet>
  );
}
