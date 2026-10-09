import { Cell, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { OverviewResponse } from "@/types";
import ChartCard from "./ChartCard";
import { institutionChartConfig } from "./chart-config";
import { numberFormatter } from "./overview-utils";

export default function InstitutionStatusChart({
  overview,
}: {
  overview: OverviewResponse;
}) {
  const data = [
    {
      type: "active",
      count: overview.institutions.active,
      fill: "var(--color-active)",
    },
    {
      type: "pending",
      count: overview.institutions.pending,
      fill: "var(--color-pending)",
    },
  ];

  return (
    <ChartCard
      title="Institution status"
      description="Active institutions and applications awaiting review"
      action={
        <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium tabular-nums text-muted-foreground">
          {numberFormatter.format(overview.institutions.total)} total
        </span>
      }
    >
      <ChartContainer config={institutionChartConfig} className="h-64 w-full">
        <PieChart accessibilityLayer>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent nameKey="type" />}
          />
          <Pie
            data={data}
            dataKey="count"
            nameKey="type"
            innerRadius={66}
            outerRadius={96}
            paddingAngle={4}
            strokeWidth={4}
            stroke="var(--card)"
          >
            {data.map((item) => (
              <Cell key={item.type} fill={item.fill} />
            ))}
          </Pie>
          <ChartLegend
            content={<ChartLegendContent nameKey="type" />}
            verticalAlign="bottom"
          />
        </PieChart>
      </ChartContainer>
    </ChartCard>
  );
}
