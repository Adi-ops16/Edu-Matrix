import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getProfile } from "@/api";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};

export const useGetProfileSuspense = () => {
  return useSuspenseQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};
