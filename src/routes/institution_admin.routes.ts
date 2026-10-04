import {
  IconChalkboardTeacher,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
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
  {
    title: "Institution Management",
    items: [
      {
        title: "Applications",
        url: `${prefix}/applications`,
        icon: IconUser,
      },
      {
        title: "Students",
        url: `${prefix}/students`,
        icon: IconUsers,
      },
      {
        title: "Teachers",
        url: `${prefix}/teachers`,
        icon: IconChalkboardTeacher,
      },
    ],
  },
];
