export type Role = "INSTITUTION_ADMIN" | "SUPER_ADMIN" | "STUDENT" | "TEACHER";

export type Providers = "CREDENTIALS" | "GOOGLE";
export type UserStatus = "ACTIVE" | "BAN";
export type MemberStatus = "NOT_JOINED" | "PENDING" | "APPROVED" | "DECLINED";

export interface User {
  id: string;
  name: string;
  email: string;
  google_id: null | string;
  profile_url: null | string;
  profile_public_id: null | string;
  role: null | Role;
  provider: Providers;
  user_status: UserStatus;
  member_status: MemberStatus;
  is_active: boolean;
  is_deleted: boolean;
  is_verified: boolean;
  institution_id: null | string;
  created_at: string;
  updated_at: string;
}
