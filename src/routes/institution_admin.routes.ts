import {
  IconBook,
  IconBookUpload,
  IconBuilding,
  IconBuildingPlus,
  IconChalkboardTeacher,
  IconUser,
  IconUserPlus,
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
  {
    title: "Course Management",
    items: [
      {
        title: "Courses",
        url: `${prefix}/courses`,
        icon: IconBook,
      },
      {
        title: "Assign teachers",
        url: `${prefix}/assign-teachers`,
        icon: IconUserPlus,
      },
      {
        title: "Create Course",
        url: `${prefix}/create-course`,
        icon: IconBookUpload,
      },
    ],
  },
];
