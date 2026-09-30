"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useGetProfile } from "@/hooks";
import AuthLoading from "./AuthLoading";

const dashboardPaths = {
  INSTITUTION_ADMIN: "/institution_admin",
  STUDENT: "/student",
  SUPER_ADMIN: "/super_admin",
  TEACHER: "/teacher",
} as const;

interface Props {
  children?: ReactNode;
  redirectAuthenticatedUser?: boolean;
}

export default function AuthGuard({
  children,
  redirectAuthenticatedUser = false,
}: Props) {
  const router = useRouter();
  const { data, isPending, isError } = useGetProfile();
  const profile = data?.data;

  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isError || !profile) {
      router.replace("/login");
      return;
    }
    if (!profile.role) {
      router.replace("/select-institution");
      return;
    }
    if (redirectAuthenticatedUser) {
      router.replace(dashboardPaths[profile.role]);
    }
  }, [profile, isError, router, isPending, redirectAuthenticatedUser]);

  if (
    isPending ||
    isError ||
    !profile ||
    !profile.role ||
    redirectAuthenticatedUser
  ) {
    return <AuthLoading />;
  }

  return children;
}
