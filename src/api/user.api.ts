import apiClient from "@/lib/ofetch";
import type {
  ApiResponse,
  StudentProfileUpdatePayload,
  TeacherProfileUpdatePayload,
  UserProfile,
  UserProfileUpdatePayload,
} from "@/types";

const prefix = "/user";

export const getProfile = () => {
  return apiClient<ApiResponse<UserProfile>>(`${prefix}/profile`);
};

export const updatedProfilePicture = (picture: File) => {
  const formData = new FormData();
  formData.append("picture", picture);

  return apiClient<ApiResponse<string>>(`${prefix}/update-profile-picture`, {
    method: "PATCH",
    body: formData,
  });
};

export const updateUserProfile = (payload: UserProfileUpdatePayload) => {
  return apiClient<ApiResponse<UserProfile>>(`${prefix}/profile`, {
    method: "PATCH",
    body: payload,
  });
};

export const updateStudentProfile = (payload: StudentProfileUpdatePayload) => {
  return apiClient<ApiResponse<UserProfile>>(`/student/profile-update`, {
    method: "PATCH",
    body: payload,
  });
};

export const updateTeacherProfile = (payload: TeacherProfileUpdatePayload) => {
  const { certificate, ...data } = payload;

  const formData = new FormData();

  formData.append("data", JSON.stringify(data));
  if (certificate) {
    formData.append("certificate", certificate);
  }

  return apiClient<ApiResponse<UserProfile>>(`/teacher/profile-update`, {
    method: "PATCH",
    body: formData,
  });
};
