import { useMutation, useQuery } from "@tanstack/react-query";
import { applyForInstitution, getInstitutions } from "@/api";

export const useGetInstitutions = () => {
  return useQuery({
    queryKey: ["institutions"],
    queryFn: getInstitutions,
  });
};

export const useApplyForInstitution = () => {
  return useMutation({
    mutationFn: applyForInstitution,
  });
};
