import type z from "zod";
import type { studentProfileUpdateSchema } from "@/schemas";
import type { Gender, User } from "./user.types";

export type StudentProfileUpdatePayload = z.infer<
  typeof studentProfileUpdateSchema
>;

export interface StudentDetails {
  student_id: string;
  admission_year: number | null;
  graduation_year: number | null;
  date_of_birth: string | null;
  gender: Gender | null;
  phone: string | null;
  address: string | null;
  certificate_url: string | null;
  certificate_public_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface InstitutionStudents
  extends Pick<User, "name" | "email" | "profile_url"> {
  student: StudentDetails;
}

export interface DepartmentStudents extends InstitutionStudents {}
