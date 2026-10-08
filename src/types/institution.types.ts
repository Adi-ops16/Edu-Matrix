import type z from "zod";
import type {
  createInstitutionSchema,
  institutionReviewSchema,
} from "@/schemas";

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
