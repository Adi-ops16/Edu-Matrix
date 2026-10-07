import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCourse,
  getCourseDetailsForAdmin,
  getCourseDetailsForStudents,
  getCourses,
} from "@/api";
import type { Query } from "@/types";

export const useGetCourses = (departmentId: string, query: Query) => {
  return useQuery({
    queryKey: ["courses", query, departmentId],
    queryFn: () => getCourses(departmentId, query),
    enabled: Boolean(departmentId),
  });
};

export const useGetCourseDetailsForAdmin = (courseId: string, query: Query) => {
  return useQuery({
    queryKey: ["course-details/admin", query, courseId],
    queryFn: () => getCourseDetailsForAdmin(courseId, query),
    enabled: Boolean(courseId),
  });
};

export const useGetCourseDetailsForStudents = (courseId: string) => {
  return useQuery({
    queryKey: ["course-details/students", courseId],
    queryFn: () => getCourseDetailsForStudents(courseId),
    enabled: Boolean(courseId),
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
