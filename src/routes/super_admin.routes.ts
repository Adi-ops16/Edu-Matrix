import { IconUser } from "@tabler/icons-react";
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
];
