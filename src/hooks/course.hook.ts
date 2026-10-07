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

export const useGetCourseDetailsForAdmin = (
  departmentId: string,
  query: Query,
) => {
  return useQuery({
    queryKey: ["course-details/admin", query, departmentId],
    queryFn: () => getCourseDetailsForAdmin(departmentId, query),
    enabled: Boolean(departmentId),
  });
};

export const useGetCourseDetailsForStudents = (departmentId: string) => {
  return useQuery({
    queryKey: ["course-details/students", departmentId],
    queryFn: () => getCourseDetailsForStudents(departmentId),
    enabled: Boolean(departmentId),
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
