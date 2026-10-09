import type { OverviewResponse } from "@/types";
import AcademicActivityChart from "./AcademicActivityChart";
import InstitutionStatusChart from "./InstitutionStatusChart";
import RevenueChart from "./RevenueChart";
import UserCompositionChart from "./UserCompositionChart";

export default function OverviewCharts({
  overview,
}: {
  overview: OverviewResponse;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <UserCompositionChart overview={overview} />
      <InstitutionStatusChart overview={overview} />
      <AcademicActivityChart overview={overview} />
      <RevenueChart overview={overview} />
    </div>
  );
}
