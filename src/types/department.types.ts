import type z from "zod";
import type { createDepartmentSchema, updateDepartmentSchema } from "@/schemas";

export type CreateDepartmentPayload = z.infer<typeof createDepartmentSchema>;
export type UpdateDepartmentPayload = z.infer<typeof updateDepartmentSchema>;

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
