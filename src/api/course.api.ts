import apiClient from "@/lib/ofetch";
import type {
  ApiResponse,
  Course,
  CourseDetails,
  CourseDetailsStudent,
  CreateCoursePayload,
  Query,
} from "@/types";

const prefix = "/course";

export const getCourses = (department_id: string, params?: Query) => {
  return apiClient<ApiResponse<Course[]>>(
    `${prefix}/courses/${department_id}`,
    {
      query: params,
    },
  );
};

export const getCourseDetailsForAdmin = (
  department_id: string,
  params?: Query,
) => {
  return apiClient<ApiResponse<CourseDetails[]>>(
    `${prefix}/admin/details/${department_id}`,
    {
      query: params,
    },
  );
};

export const getCourseDetailsForStudents = (department_id: string) => {
  return apiClient<ApiResponse<CourseDetailsStudent>>(
    `${prefix}/details/${department_id}`,
  );
};

export const createCourse = (payload: CreateCoursePayload) => {
  return apiClient<ApiResponse<Course>>(`${prefix}/create/`, {
    method: "POST",
    body: payload,
  });
};
