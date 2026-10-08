import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  getInstitutionTeachers,
  getTeachersToAssignToCourse,
  updateTeacherProfile,
} from "@/api";
import type { Query } from "@/types";

export const useUpdateTeacherProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTeacherProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useGetInstitutionTeachers = (query: Query) => {
  return useSuspenseQuery({
    queryKey: ["teachers", query],
    queryFn: () => getInstitutionTeachers(query),
  });
};

export const useGetTeacherToAssignToCourse = (
  courseDetailsId: string,
  query: Query,
  enabled = true,
) => {
  return useQuery({
    queryKey: ["teachers-assign", courseDetailsId, query],
    queryFn: () => getTeachersToAssignToCourse(courseDetailsId, query),
    enabled: Boolean(courseDetailsId) && enabled,
  });
};
