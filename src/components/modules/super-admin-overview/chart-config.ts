import type { ChartConfig } from "@/components/ui/chart";

export const userChartConfig = {
  students: { label: "Students", color: "var(--chart-1)" },
  teachers: { label: "Teachers", color: "var(--chart-2)" },
} satisfies ChartConfig;

export const institutionChartConfig = {
  active: { label: "Active", color: "var(--chart-1)" },
  pending: { label: "Pending", color: "var(--chart-4)" },
} satisfies ChartConfig;

export const academicChartConfig = {
  total: { label: "Total", color: "var(--chart-1)" },
} satisfies ChartConfig;

export const revenueChartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
} satisfies ChartConfig;
