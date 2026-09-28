import type z from "zod";
import type { loginSchema } from "@/schemas";

export type LoginPayload = z.infer<typeof loginSchema>;
