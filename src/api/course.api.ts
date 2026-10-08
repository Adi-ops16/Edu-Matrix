import apiClient from "@/lib/ofetch";
import type {
  ApiResponse,
  AssignTeacherToCoursePayload,
  Course,
  CourseDetails,
  CourseDetailsStudent,
  CreateCoursePayload,
  MyCoursesResponse,
  Query,
  UpdateCourseStatusPayload,
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

export const getCourseDetailsForAdmin = (courseId: string, params?: Query) => {
  return apiClient<ApiResponse<CourseDetails[]>>(
    `${prefix}/admin/details/${courseId}`,
    {
      query: params,
    },
  );
};

export const getCourseDetailsForStudents = (courseId: string) => {
  return apiClient<ApiResponse<CourseDetailsStudent>>(
    `${prefix}/details/${courseId}`,
  );
};

export const getMyCourses = () => {
  return apiClient<ApiResponse<MyCoursesResponse[]>>(`${prefix}/my-courses`);
};

export const createCourse = (payload: CreateCoursePayload) => {
  return apiClient<ApiResponse<Course>>(`${prefix}/create/`, {
    method: "POST",
    body: payload,
  });
};

export const assignTeacherToCourse = (
  payload: AssignTeacherToCoursePayload,
) => {
  return apiClient(`${prefix}/assign-teacher`, {
    method: "PATCH",
    body: payload,
  });
};

export const updateCourseStatus = (payload: UpdateCourseStatusPayload) => {
  return apiClient<ApiResponse<unknown>>(`${prefix}/update-status`, {
    method: "PATCH",
    body: payload,
  });
};
