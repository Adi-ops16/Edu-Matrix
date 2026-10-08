import {
  IconBookFilled,
  IconBookmark,
  IconBuilding,
  IconUser,
} from "@tabler/icons-react";
import type { Route } from "@/types";

const prefix = "/student";
export const studentRoutes: Route[] = [
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
    title: "Academics",
    items: [
      {
        title: "Departments",
        url: `${prefix}/departments`,
        icon: IconBuilding,
      },
      {
        title: "My Courses",
        url: `${prefix}/my-courses`,
        icon: IconBookmark,
      },
      {
        title: "All Courses",
        url: `${prefix}/courses`,
        icon: IconBookFilled,
      },
    ],
  },
];
