import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  getDepartmentStudents,
  getInstitutionStudents,
  updateStudentProfile,
} from "@/api";
import type { Query } from "@/types";

export const useUpdateStudentProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStudentProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useGetInstitutionStudents = (query: Query) => {
  return useSuspenseQuery({
    queryKey: ["students", query],
    queryFn: () => getInstitutionStudents(query),
  });
};

export const useGetDepartmentStudents = (
  department_id: string,
  query: Query,
) => {
  return useSuspenseQuery({
    queryKey: ["department-students", department_id, query],
    queryFn: () => getDepartmentStudents(department_id, query),
  });
};
