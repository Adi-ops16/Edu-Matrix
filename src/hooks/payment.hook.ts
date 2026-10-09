import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStripeCheckout, getPaymentHistory } from "@/api";

export const useCreateStripeCheckout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStripeCheckout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-details/students"] });
      queryClient.invalidateQueries({ queryKey: ["my-courses"] });
    },
  });
};

export const useGetPaymentHistory = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: getPaymentHistory,
  });
};
