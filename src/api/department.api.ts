import apiClient from "@/lib/ofetch";
import type {
  ApiResponse,
  CreateDepartmentPayload,
  Department,
  UpdateDepartmentPayload,
} from "@/types";

const prefix = "/department";

export const getDepartments = () => {
  return apiClient<ApiResponse<Department[]>>(`${prefix}/departments`);
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
