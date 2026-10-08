import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getInstitutionStudents, updateStudentProfile } from "@/api";
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
