import apiClient from "@/lib/ofetch";
import type {
  ApiResponse,
  DepartmentTeachers,
  GetTeachersToAssignResponse,
  InstitutionTeachers,
  Query,
  TeacherProfileUpdatePayload,
  UserProfile,
} from "@/types";

const prefix = "/teacher";

export const updateTeacherProfile = (payload: TeacherProfileUpdatePayload) => {
  const { certificate, ...data } = payload;

  const formData = new FormData();

  formData.append("data", JSON.stringify(data));
  if (certificate) {
    formData.append("certificate", certificate);
  }

  return apiClient<ApiResponse<UserProfile>>(`${prefix}/profile-update`, {
    method: "PATCH",
    body: formData,
  });
};

export const getInstitutionTeachers = (query: Query) => {
  return apiClient<ApiResponse<InstitutionTeachers[]>>(`${prefix}/teachers`, {
    query,
  });
};

export const getTeachersToAssignToCourse = (
  courseDetailsId: string,
  query: Query,
) => {
  return apiClient<ApiResponse<GetTeachersToAssignResponse[]>>(
    `${prefix}/assign/${courseDetailsId}`,
    {
      query,
    },
  );
};

export const getDepartmentTeachers = (department_id: string, query: Query) => {
  return apiClient<ApiResponse<DepartmentTeachers[]>>(
    `${prefix}/department/${department_id}`,
    {
      query,
    },
  );
};
