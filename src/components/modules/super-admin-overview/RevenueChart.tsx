import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { OverviewResponse } from "@/types";
import ChartCard from "./ChartCard";
import { revenueChartConfig } from "./chart-config";
import { formatCurrency, numberFormatter } from "./overview-utils";

export default function RevenueChart({
  overview,
}: {
  overview: OverviewResponse;
}) {
  const data = [
    { period: "All time", revenue: overview.financials.totalRevenue },
    { period: "This month", revenue: overview.financials.revenueThisMonth },
  ];
  const currency = overview.financials.currency;

  return (
    <ChartCard
      title="Revenue snapshot"
      description={`Reported revenue in ${currency}`}
      action={
        <div className="text-right">
          <p className="text-xs text-muted-foreground">This month</p>
          <p className="font-semibold tabular-nums">
            {formatCurrency(overview.financials.revenueThisMonth, currency)}
          </p>
        </div>
      }
    >
      <ChartContainer config={revenueChartConfig} className="h-64 w-full">
        <BarChart
          accessibilityLayer
          data={data}
          margin={{ left: 8, right: 8, top: 12, bottom: 8 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="period"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value: number) => numberFormatter.format(value)}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                formatter={(value) =>
                  formatCurrency(Number(value), currency)
                }
              />
            }
          />
          <Bar
            dataKey="revenue"
            fill="var(--color-revenue)"
            radius={[6, 6, 0, 0]}
            maxBarSize={64}
          />
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
