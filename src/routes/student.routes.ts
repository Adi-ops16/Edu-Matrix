import { IconBookFilled, IconUser } from "@tabler/icons-react";

const prefix = "/student";
export const studentRoutes = [
  {
    title: "Profile",
    url: `${prefix}`,
    icon: IconUser,
  },
  {
    title: "My courses",
    url: `${prefix}/courses`,
    icon: IconBookFilled,
  },
];
