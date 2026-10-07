import type z from "zod";
import type { createCourseSchema } from "@/schemas";
import type { Department } from "./department.types";
import type { TeacherDetails, User } from "./user.types";

export type TCreateCoursePayload = z.infer<typeof createCourseSchema>;
export type CreateCoursePayload = Omit<TCreateCoursePayload, "include_details">;

export interface CourseDetails {
  id: number;
  semester: string;
  batch: string;
  start_date: string;
  end_date: string;
  status: "ONGOING" | "COMPLETED" | "UPCOMING";
  price: string;
  currency: string;
  course_id: string;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  description: string;
  learning_outcomes: string[];
  department_id: string;
  course_details: CourseDetails | null;
}

export interface CourseDetailsStudent extends CourseDetails {
  department: Pick<
    Department,
    "code" | "department_description" | "department_established_year" | "name"
  >;
  teachers: (Pick<
    TeacherDetails,
    "certificate_url" | "degree" | "specialization"
  > &
    Pick<User, "name" | "profile_url">)[];
  title: string;
  code: string;
  description: string;
  learning_outcomes: string[];
}
