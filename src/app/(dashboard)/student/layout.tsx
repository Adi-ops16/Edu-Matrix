import type { ReactNode } from "react";
import DashboardShell from "@/components/modules/dashboard/DashboardShell";

export default function StudentDashboardLayout({
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
