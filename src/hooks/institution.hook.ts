import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  applyForInstitution,
  createInstitution,
  getInstitutionApplications,
  getInstitutions,
  reviewInstitution,
} from "@/api";

export const useGetInstitutions = () => {
  return useQuery({
    queryKey: ["institutions"],
    queryFn: getInstitutions,
  });
};

export const useGetInstitutionsSuspense = () => {
  return useSuspenseQuery({
    queryKey: ["institutions"],
    queryFn: getInstitutions,
  });
};

export const useGetInstitutionApplications = () => {
  return useSuspenseQuery({
    queryKey: ["institution-application"],
    queryFn: getInstitutionApplications,
  });
};

export const useApplyForInstitution = () => {
  return useMutation({
    mutationFn: applyForInstitution,
  });
};

export const useCreateInstitution = () => {
  return useMutation({
    mutationFn: createInstitution,
  });
};
export const useReviewInstitution = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reviewInstitution,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["institution-application"] });
      queryClient.invalidateQueries({ queryKey: ["institutions"] });
    },
  });
};
