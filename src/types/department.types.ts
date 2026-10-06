import type z from "zod";
import type {
  createDepartmentSchema,
  reviewDepartmentApplicationSchema,
  updateDepartmentSchema,
} from "@/schemas";

export type CreateDepartmentPayload = z.infer<typeof createDepartmentSchema>;
export type UpdateDepartmentPayload = z.infer<typeof updateDepartmentSchema>;
export type reviewDepartmentApplicationPayload = z.infer<
  typeof reviewDepartmentApplicationSchema
>;

export interface Department {
  id: string;
  name: string;
  code: string;
  department_description: string;
  department_established_year: number;
  institution_id: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface DepartmentResponse {
  departments: Department[];
  myDepartmentsIds?: string[];
}

export interface DepartmentJoinRequest {
  id: string;
  name: string;
  role: "STUDENT" | "TEACHER";
  gender: string | null;
  profile_url: string | null;
  date_of_birth: string | null;
  address: string | null;
}

export interface DepartmentJoinRequestsResponse {
  students: DepartmentJoinRequest[];
  teachers: DepartmentJoinRequest[];
}
