import apiClient from "@/lib/ofetch";
import type { LoginPayload } from "@/types";

const prefix = "/auth";

export const login = (payload: LoginPayload) => {
  return apiClient(`${prefix}/login`, {
    method: "POST",
    body: payload,
  });
};
