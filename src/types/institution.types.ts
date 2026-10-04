import type z from "zod";
import type {
  createInstitutionSchema,
  institutionReviewSchema,
} from "@/schemas";
import type { Gender } from "./user.types";

export type InstitutionStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Institution {
  id: number;
  name: string;
  code: string;
  description: string;
  established_year: number;
  website: string | null;
  address: string;
  city: string;
  contact_email: string;
  contact_number: string;
  status: InstitutionStatus;
  created_by: string;
  reviewed_by: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface InstitutionStudents {
  student_id: string;
  admission_year: number;
  graduation_year: number;
  date_of_birth: string;
  gender: Gender;
  phone: string;
  address: string;
  certificate_url: string;
  user: {
    name: string;
    profile_url: string;
    email: string;
  };
}

export interface InstitutionTeachers {
  name: string;
  profile_url: string | null;
  email: string;
  teacher: {
    teacher_id: string;
    designation: string;
    degree: string;
    specialization: string;
    graduated_from: string;
    graduation_year: number;
    date_of_birth: string;
    gender: Gender;
    phone: string;
    address: string;
    joining_year: number;
    bio: string;
    certificate_url: string;
  };
}

export type ApplyForInstitutionPayload = {
  institution_id: number;
  role: "STUDENT" | "TEACHER";
};
export type ReviewJoiningInstitutionPayload = {
  user_id: string;
  membership_status: "APPROVED" | "DECLINED";
};

export type CreateInstitutionPayload = z.infer<typeof createInstitutionSchema>;
export type ReviewInstitutionPayload = z.infer<typeof institutionReviewSchema>;
