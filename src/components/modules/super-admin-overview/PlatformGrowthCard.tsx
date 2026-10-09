import { IconBook2, IconCalendarStats, IconChartBar } from "@tabler/icons-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import type { OverviewResponse } from "@/types";
import { numberFormatter } from "./overview-utils";

export default function PlatformGrowthCard({
  overview,
}: {
  overview: OverviewResponse;
}) {
  return (
    <Card className="bg-muted/40">
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <IconCalendarStats className="size-5" aria-hidden="true" />
          </div>
          <div>
            <p className="font-medium">Platform growth this month</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {numberFormatter.format(overview.institutions.growthThisMonth)}{" "}
              institutions added and{" "}
              {numberFormatter.format(overview.users.newStudentsThisMonth)} new
              students joined.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <IconBook2 className="size-4" aria-hidden="true" />
            {numberFormatter.format(overview.academics.totalCourseBlueprints)}{" "}
            course blueprints
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IconChartBar className="size-4" aria-hidden="true" />
            {numberFormatter.format(
              overview.academics.totalStudentEnrollments,
            )}{" "}
            enrollments
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
