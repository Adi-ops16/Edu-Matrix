import { IconUser } from "@tabler/icons-react";
import type { Route } from "@/types";

const prefix = "/institution_admin";

export const institutionAdminRoutes: Route[] = [
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
