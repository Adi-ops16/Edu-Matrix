import apiClient from "@/lib/ofetch";
import type { ApiResponse, OverviewResponse } from "@/types";

const prefix = "/admin";

export const getPlatformOverview = () => {
  return apiClient<ApiResponse<OverviewResponse>>(`${prefix}/overview`);
};
