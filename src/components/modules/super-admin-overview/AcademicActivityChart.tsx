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
import { academicChartConfig } from "./chart-config";

export default function AcademicActivityChart({
  overview,
}: {
  overview: OverviewResponse;
}) {
  const data = [
    { category: "Departments", total: overview.academics.totalDepartments },
    {
      category: "Course blueprints",
      total: overview.academics.totalCourseBlueprints,
    },
    {
      category: "Ongoing sections",
      total: overview.academics.ongoingCourseSections,
    },
    {
      category: "Student enrollments",
      total: overview.academics.totalStudentEnrollments,
    },
  ];

  return (
    <ChartCard
      title="Academic activity"
      description="Current scale across the academic platform"
    >
      <ChartContainer config={academicChartConfig} className="h-64 w-full">
        <BarChart
          accessibilityLayer
          data={data}
          layout="vertical"
          margin={{ left: 8, right: 16, top: 8, bottom: 8 }}
        >
          <CartesianGrid horizontal={false} />
          <YAxis
            dataKey="category"
            type="category"
            tickLine={false}
            axisLine={false}
            width={128}
            tickMargin={8}
          />
          <XAxis dataKey="total" type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Bar
            dataKey="total"
            fill="var(--color-total)"
            radius={[0, 6, 6, 0]}
            barSize={22}
          />
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
