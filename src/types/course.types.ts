import type z from "zod";
import type {
  assignTeacherToCourseSchema,
  createCourseDetailsSchema,
  createCourseSchema,
} from "@/schemas";
import type { Department } from "./department.types";
import type { TeacherDetails } from "./teacher.types";
import type { User } from "./user.types";

export type TCreateCoursePayload = z.infer<typeof createCourseSchema>;
export type CreateCoursePayload = Omit<TCreateCoursePayload, "include_details">;
export type AssignTeacherToCoursePayload = z.infer<
  typeof assignTeacherToCourseSchema
>;
export interface CreateCourseDetailsPayload {
  course_id: string;
  details: z.infer<typeof createCourseDetailsSchema>;
}

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

export interface MyCoursesResponse
  extends Pick<
    CourseDetails,
    "semester" | "start_date" | "end_date" | "status"
  > {
  department: Pick<
    Department,
    "code" | "department_description" | "department_established_year" | "name"
  >;
  course: Pick<Course, "learning_outcomes" | "title" | "description" | "code">;
}

export interface UpdateCourseStatusPayload {
  course_details_id: number;
  status: "ONGOING" | "COMPLETED";
}
