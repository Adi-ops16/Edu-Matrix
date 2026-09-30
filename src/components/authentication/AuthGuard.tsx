import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useGetProfile } from "@/hooks";
import AuthLoading from "./AuthLoading";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data, isPending, isError } = useGetProfile();
  const profile = data?.data;

  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isError || !profile) {
      router.replace("/login");
    }
  }, [profile, isError, router, isPending]);

  if (isPending) {
    return <AuthLoading />;
  }

  return children;
}
