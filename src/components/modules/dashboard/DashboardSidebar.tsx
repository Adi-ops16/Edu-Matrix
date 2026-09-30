"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import Logo from "@/components/shared/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useGetProfileSuspense } from "@/hooks";
import { institutionAdminRoutes } from "@/routes/institution_admin.routes";
import { studentRoutes } from "@/routes/student.routes";
import { SuperAdminRoutes } from "@/routes/super_admin.routes";
import { teacherRoutes } from "@/routes/teacher.routes";
import DashboardFooter from "./DashboardFooter";

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { data } = useGetProfileSuspense();

  const profile = data?.data;

  if (!profile) {
    throw new Error("Profile response did not include user data.");
  }

  const role = profile.role;
  const routes =
    role === "STUDENT"
      ? studentRoutes
      : role === "TEACHER"
        ? teacherRoutes
        : role === "SUPER_ADMIN"
          ? SuperAdminRoutes
          : institutionAdminRoutes;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[slot=sidebar-menu-button]:p-1.5!">
              <a href="/">
                <Logo />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {routes.map((r) => {
          return (
            <SidebarGroup key={`${r.title}`}>
              <SidebarGroupLabel>{r.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                {r.items.map((i) => {
                  const isActive = pathname === i.url;
                  return (
                    <SidebarMenu key={`${i.title}-${i.url}`}>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={<Link href={i.url} />}
                          isActive={isActive}
                        >
                          <i.icon />
                          {i.title}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  );
                })}
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      <DashboardFooter profile={profile} />
    </Sidebar>
  );
}
