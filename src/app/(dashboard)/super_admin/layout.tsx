import type { ReactNode } from "react";
import DashboardShell from "@/components/modules/dashboard/DashboardShell";

export default function SuperAdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <DashboardShell> {children}</DashboardShell>
    </div>
  );
}
