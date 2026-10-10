import { IconBookmark, IconBuilding, IconUser } from "@tabler/icons-react";
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
  {
    title: "Department Management",
    items: [
      {
        title: "Departments",
        url: `${prefix}/departments`,
        icon: IconBuilding,
      },
    ],
  },
  {
    title: "Course Management",
    items: [
      {
        title: "My courses",
        url: `${prefix}/my-courses`,
        icon: IconBookmark,
      },
    ],
  },
];
