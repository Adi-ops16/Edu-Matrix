import apiClient from "@/lib/ofetch";
import type {
  ApiResponse,
  ApplyForInstitutionPayload,
  CreateInstitutionPayload,
  Institution,
  ReviewInstitutionPayload,
  ReviewJoiningInstitutionPayload,
  User,
} from "@/types";

const prefix = "/institution";

// Joining in institution related apis

export const getJoiningApplications = () => {
  return apiClient<ApiResponse<User[]>>(`${prefix}/joining-applications`);
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

export const reviewJoiningApplications = (
  payload: ReviewJoiningInstitutionPayload,
) => {
  return apiClient<ApiResponse<User>>(`${prefix}/joining-application-review`, {
    method: "PATCH",
    body: payload,
  });
};

// Institution related apis

export const getInstitutions = () => {
  return apiClient<ApiResponse<Institution[]>>(`${prefix}/institutions`);
};

export const getInstitutionApplications = () => {
  return apiClient<ApiResponse<Institution[]>>(
    `${prefix}/institution-applications`,
  );
};

export const createInstitution = (payload: CreateInstitutionPayload) => {
  return apiClient<ApiResponse<Institution>>(`${prefix}/create-institution`, {
    method: "POST",
    body: payload,
  });
};

export const reviewInstitution = (payload: ReviewInstitutionPayload) => {
  return apiClient<ApiResponse<Institution>>(
    `${prefix}/institution-application-review`,
    {
      method: "PATCH",
      body: payload,
    },
  );
};
