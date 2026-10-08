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
  getJoiningApplications,
  reviewInstitution,
  reviewJoiningApplications,
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

export const useGetJoiningApplications = () => {
  return useSuspenseQuery({
    queryKey: ["joining-application"],
    queryFn: getJoiningApplications,
  });
};

export const useReviewJoiningApplications = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reviewJoiningApplications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["joining-application"] });
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
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
