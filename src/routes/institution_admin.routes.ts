import {
  IconBuilding,
  IconBuildingPlus,
  IconChalkboardTeacher,
  IconUser,
  IconUsers,
  IconWritingFilled,
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
  {
    title: "Department Management",
    items: [
      {
        title: "Departments",
        url: `${prefix}/departments`,
        icon: IconBuilding,
      },
      {
        title: "Create Department",
        url: `${prefix}/create-department`,
        icon: IconWritingFilled,
      },
      {
        title: "Department Joining applications",
        url: `${prefix}/department-applications`,
        icon: IconBuildingPlus,
      },
    ],
  },
];
