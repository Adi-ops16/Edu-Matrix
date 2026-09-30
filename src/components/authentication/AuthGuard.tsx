import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useGetProfile } from "@/hooks";
import AuthLoading from "./AuthLoading";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data, isPending } = useGetProfile();
  const profile = data?.data;

  useEffect(() => {
    if (isPending) {
      return;
    }
    if (!profile) {
      router.replace("/login");
    }
  }, [profile, router, isPending]);

  if (isPending) {
    return <AuthLoading />;
  }

  return children;
}
