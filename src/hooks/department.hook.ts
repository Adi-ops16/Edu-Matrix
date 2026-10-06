import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  createDepartment,
  getDepartmentRequests,
  getDepartments,
  joinDepartmentRequest,
  reviewDepartmentJoiningApplication,
  updateDepartment,
} from "@/api";

export const useGetDepartments = () => {
  return useSuspenseQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });
};

export const useGetDepartmentRequests = (departmentId: string) => {
  return useQuery({
    queryKey: ["department-requests", departmentId],
    queryFn: () => getDepartmentRequests(departmentId),
    enabled: Boolean(departmentId),
  });
};

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

export const useJoinDepartmentRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: joinDepartmentRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

export const useReviewDepartmentJoiningApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reviewDepartmentJoiningApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({ queryKey: ["department-requests"] });
    },
  });
};
