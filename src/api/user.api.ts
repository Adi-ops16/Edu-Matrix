import apiClient from "@/lib/ofetch";
import type { ApiResponse, UserProfile } from "@/types";

const prefix = "/user";

export const getProfile = () => {
  return apiClient<ApiResponse<UserProfile>>(`${prefix}/profile`);
};
