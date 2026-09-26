import apiClient from "@/lib/ofetch";

const prefix = "/student";

export const getProfile = () => {
  return apiClient(`${prefix}/profile`);
};
