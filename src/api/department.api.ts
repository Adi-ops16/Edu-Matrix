import apiClient from "@/lib/ofetch";
import type {
  ApiResponse,
  CreateDepartmentPayload,
  Department,
  DepartmentJoinRequestsResponse,
  DepartmentResponse,
  reviewDepartmentApplicationPayload,
  UpdateDepartmentPayload,
} from "@/types";

const prefix = "/department";

export const getDepartments = () => {
  return apiClient<ApiResponse<DepartmentResponse>>(
    `${prefix}/departments`,
  );
};

export const getDepartmentRequests = (departmentId: string) => {
  return apiClient<ApiResponse<DepartmentJoinRequestsResponse>>(
    `${prefix}/requests/${departmentId}`,
  );
};

export const createDepartment = (payload: CreateDepartmentPayload) => {
  return apiClient<ApiResponse<Department[]>>(`${prefix}/create`, {
    method: "POST",
    body: payload,
  });
};

export const updateDepartment = (payload: UpdateDepartmentPayload) => {
  return apiClient<ApiResponse<Department[]>>(`${prefix}/update`, {
    method: "PATCH",
    body: payload,
  });
};

export const joinDepartmentRequest = (department_id: string) => {
  return apiClient<ApiResponse<Department[]>>(`${prefix}/join`, {
    method: "POST",
    body: { department_id },
  });
};

export const reviewDepartmentJoiningApplication = (
  payload: reviewDepartmentApplicationPayload,
) => {
  return apiClient<ApiResponse<Department[]>>(`${prefix}/review-request`, {
    method: "PATCH",
    body: payload,
  });
};
