import { IconUser } from "@tabler/icons-react";
import type { Route } from "@/types";

const prefix = "/teacher";

export const teacherRoutes: Route[] = [
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
