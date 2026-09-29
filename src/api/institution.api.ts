import apiClient from "@/lib/ofetch";
import type {
  ApiResponse,
  ApplyForInstitutionPayload,
  CreateInstitutionPayload,
  Institution,
} from "@/types";

const prefix = "/institution";

export const getInstitutions = () => {
  return apiClient<ApiResponse<Institution[]>>(`${prefix}/institutions`);
};

export const applyForInstitution = (payload: ApplyForInstitutionPayload) => {
  return apiClient<ApiResponse<Institution>>(
    `${prefix}/apply-for-institution`,
    {
      method: "POST",
      body: payload,
    },
  );
};

export const createInstitution = (payload: CreateInstitutionPayload) => {
  return apiClient<ApiResponse<Institution>>(`${prefix}/create-institution`, {
    method: "POST",
    body: payload,
  });
};
