import {
  IconBuildingCommunity,
  IconChartBar,
  IconClipboardList,
  IconUser,
} from "@tabler/icons-react";
import type { Route } from "@/types";

const prefix = "/super_admin";

export const SuperAdminRoutes: Route[] = [
  {
    title: "Profile",
    items: [
      {
        title: "Profile",
        url: `${prefix}`,
        icon: IconUser,
      },
    ],
  },
  {
    title: "Institution Management",
    items: [
      {
        title: "Institutions",
        url: `${prefix}/institutions`,
        icon: IconBuildingCommunity,
      },
      {
        title: "Applications",
        url: `${prefix}/institution-applications`,
        icon: IconClipboardList,
      },
    ],
  },
  {
    title: "Platform",
    items: [
      {
        title: "Overview",
        url: `${prefix}/overview`,
        icon: IconChartBar,
      },
    ],
  },
];
