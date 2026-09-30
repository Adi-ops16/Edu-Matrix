import { IconBookFilled, IconUser } from "@tabler/icons-react";
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
        title: "My courses",
        url: `${prefix}/courses`,
        icon: IconBookFilled,
      },
    ],
  },
];
