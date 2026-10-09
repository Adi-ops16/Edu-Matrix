import {
  IconBuildingCommunity,
  IconCurrencyDollar,
  IconSchool,
  IconUsers,
} from "@tabler/icons-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import type { OverviewResponse } from "@/types";
import { formatCurrency, numberFormatter } from "./overview-utils";

function StatCard({
  label,
  value,
  caption,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  caption: string;
  icon: typeof IconUsers;
  accent: string;
}) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">
            {value}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{caption}</p>
        </div>
        <div
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${accent}`}
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function OverviewStatCards({
  overview,
}: {
  overview: OverviewResponse;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Institutions"
        value={numberFormatter.format(overview.institutions.total)}
        caption={`${numberFormatter.format(overview.institutions.active)} active · ${numberFormatter.format(overview.institutions.pending)} pending`}
        icon={IconBuildingCommunity}
        accent="bg-chart-1/10 text-chart-1"
      />
      <StatCard
        label="Students"
        value={numberFormatter.format(overview.users.totalStudents)}
        caption={`${numberFormatter.format(overview.users.newStudentsThisMonth)} new this month`}
        icon={IconUsers}
        accent="bg-chart-2/10 text-chart-2"
      />
      <StatCard
        label="Teachers"
        value={numberFormatter.format(overview.users.totalTeachers)}
        caption="Across all institutions"
        icon={IconSchool}
        accent="bg-chart-3/10 text-chart-3"
      />
      <StatCard
        label="Revenue this month"
        value={formatCurrency(
          overview.financials.revenueThisMonth,
          overview.financials.currency,
        )}
        caption={`${formatCurrency(overview.financials.totalRevenue, overview.financials.currency)} all time`}
        icon={IconCurrencyDollar}
        accent="bg-chart-4/10 text-chart-4"
      />
    </div>
  );
}
