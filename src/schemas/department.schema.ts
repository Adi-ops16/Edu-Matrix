import z from "zod";

export const createDepartmentSchema = z.object({
  name: z.string("Name is required").trim().min(1, "Name is required"),
  code: z
    .string("code is required and must be a string")
    .trim()
    .min(1, "Code is required")
    .max(5, "code must be less than 5 characters"),
  department_description: z
    .string("Description is required")
    .trim()
    .min(1, "Description is required"),
  department_established_year: z
    .number("Year must be a number")
    .int("year must be an integer")
    .min(1000, "Enter a valid year")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
});

export const updateDepartmentSchema = z.object({
  department_id: z.uuid("Invalid uuid"),
  name: z
    .string("Name is required")
    .trim()
    .min(1, "Name is required")
    .optional(),
  code: z
    .string("code is required and must be a string")
    .trim()
    .min(1, "Code is required")
    .max(5, "code must be less than 5 characters")
    .optional(),
  department_description: z
    .string("Description is required")
    .trim()
    .min(1, "Description is required")
    .optional(),
  department_established_year: z
    .number("Year must be a number")
    .int("year must be an integer")
    .min(1000, "Enter a valid year")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .optional(),
});

export const reviewDepartmentApplicationSchema = z.object({
  department_id: z.uuid("Invalid uuid"),
  user_id: z.uuid("Invalid uuid"),
  role: z.enum(["STUDENT", "TEACHER"], "Invalid role"),
  status: z.enum(["APPROVED", "DECLINED"]),
});
