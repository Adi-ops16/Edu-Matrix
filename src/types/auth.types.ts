import type z from "zod";
import type { loginSchema } from "@/schemas";
import type { ApiResponse } from "./api.types";
import type { Role, User } from "./user.types";

export type LoginPayload = z.infer<typeof loginSchema>;
export type LoginResponse = ApiResponse<{
  access_token: string;
  refresh_token: string;
  role: Role | null;
}>;

export type RegisterPayload = {
  data: {
    name: string;
    email: string;
    password: string;
  };
  photo: File | null;
};

export interface verifyEmailPayload {
  email: string;
  otp: string;
}

export type VerifyEmailResponse = ApiResponse<{
  access_token: string;
  refresh_token: string;
  user: User;
}>;
