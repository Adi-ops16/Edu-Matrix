"use client";

import { useGetPlatformOverview } from "@/hooks";
import OverviewDashboard from "./OverviewDashboard";
import OverviewError from "./OverviewError";
import OverviewSkeleton from "./OverviewSkeleton";

export default function Overview() {
  const { data, isLoading, isError, refetch } = useGetPlatformOverview();
  const overview = data?.data;

  if (isLoading) {
    return <OverviewSkeleton />;
  }

  if (isError || !overview) {
    return <OverviewError onRetry={() => void refetch()} />;
  }

  return <OverviewDashboard overview={overview} />;
}
