import z from "zod";
export const loginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z
    .string("password is required")
    .min(8, "password must be 8 characters long")
    .max(24, "password can't be more that 24 characters")
    .regex(/[a-z]/, "password should have one small letter")
    .regex(/[A-Z]/, "password should have one capital letter"),
});
