import apiClient from "@/lib/ofetch";
import type {
  ApiResponse,
  DepartmentStudents,
  InstitutionStudents,
  Query,
  StudentProfileUpdatePayload,
  UserProfile,
} from "@/types";

const prefix = "/student";

export const updateStudentProfile = (payload: StudentProfileUpdatePayload) => {
  return apiClient<ApiResponse<UserProfile>>(`${prefix}/profile-update`, {
    method: "PATCH",
    body: payload,
  });
};

export const getInstitutionStudents = (query: Query) => {
  return apiClient<ApiResponse<InstitutionStudents[]>>(`${prefix}/students`, {
    params: query,
  });
};

export const getDepartmentStudents = (department_id: string, query: Query) => {
  return apiClient<ApiResponse<DepartmentStudents[]>>(
    `${prefix}/department/${department_id}`,
    {
      query,
    },
  );
};
