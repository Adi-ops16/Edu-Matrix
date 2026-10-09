import type z from "zod";
import type { teacherProfileUpdateSchema } from "@/schemas";
import type { Gender, User } from "./user.types";

export type TeacherProfileUpdatePayload = z.infer<
  typeof teacherProfileUpdateSchema
>;

export interface TeacherDetails {
  teacher_id: string;
  designation: string | null;
  degree: string | null;
  specialization: string | null;
  graduated_from: string | null;
  graduation_year: number | null;
  date_of_birth: string | null;
  gender: Gender | null;
  phone: string | null;
  address: string | null;
  joining_year: number | null;
  bio: string | null;
  certificate_url: string | null;
  certificate_public_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface InstitutionTeachers
  extends Pick<User, "name" | "email" | "profile_url"> {
  teacher: Omit<
    TeacherDetails,
    "certificate_public_id" | "created_at" | "updated_at"
  >;
}

export type GetTeachersToAssignResponse = Pick<
  User,
  "name" | "email" | "profile_url"
> &
  Pick<
    TeacherDetails,
    "teacher_id" | "degree" | "designation" | "specialization"
  >;

export interface DepartmentTeachers extends InstitutionTeachers {}
