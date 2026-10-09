import { Cell, Label, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { OverviewResponse } from "@/types";
import ChartCard from "./ChartCard";
import { userChartConfig } from "./chart-config";
import { numberFormatter } from "./overview-utils";

export default function UserCompositionChart({
  overview,
}: {
  overview: OverviewResponse;
}) {
  const data = [
    {
      type: "students",
      count: overview.users.totalStudents,
      fill: "var(--color-students)",
    },
    {
      type: "teachers",
      count: overview.users.totalTeachers,
      fill: "var(--color-teachers)",
    },
  ];
  const total = overview.users.totalStudents + overview.users.totalTeachers;

  return (
    <ChartCard
      title="User composition"
      description="Students and teachers across the platform"
      action={
        <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium tabular-nums text-muted-foreground">
          {numberFormatter.format(total)} users
        </span>
      }
    >
      <ChartContainer config={userChartConfig} className="h-64 w-full">
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
            <Label
              position="center"
              content={({ viewBox }) => {
                if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) {
                  return null;
                }

                const centerX = Number(viewBox.cx);
                const centerY = Number(viewBox.cy);

                return (
                  <text
                    x={centerX}
                    y={centerY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={centerX}
                      y={centerY}
                      className="fill-foreground text-2xl font-semibold"
                    >
                      {numberFormatter.format(total)}
                    </tspan>
                    <tspan
                      x={centerX}
                      y={centerY + 20}
                      className="fill-muted-foreground text-xs"
                    >
                      people
                    </tspan>
                  </text>
                );
              }}
            />
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
