import { useQuery } from "@tanstack/react-query";
import { getPlatformOverview } from "@/api";

export const useGetPlatformOverview = () => {
  return useQuery({
    queryKey: ["overview"],
    queryFn: getPlatformOverview,
  });
};
