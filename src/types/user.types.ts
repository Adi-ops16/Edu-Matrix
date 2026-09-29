export type Role = "INSTITUTION_ADMIN" | "SUPER_ADMIN" | "STUDENT" | "TEACHER";

export type Providers = "CREDENTIALS" | "GOOGLE";
export type UserStatus = "ACTIVE" | "BAN";
export type MemberStatus = "NOT_JOINED" | "PENDING" | "APPROVED" | "DECLINED";
export type Gender = "MALE" | "FEMALE" | "KINDER" | "OTHER";

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

export interface TeacherDetails {
  teacher_id: string;
  designation: string | null;
  degree: string | null;
  specialization: string | null;
  graduated_from: string | null;
  graduation_year: number | null;
  date_of_birth: string | null;
  gender: Gender | null;
  phone: string | null;
  address: string | null;
  joining_year: number | null;
  bio: string | null;
  certificate_url: string | null;
  certificate_public_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  google_id: string | null;
  profile_url: string | null;
  profile_public_id: string | null;
  role: Role | null;
  provider: Providers;
  user_status: UserStatus;
  member_status: MemberStatus;
  is_active: boolean;
  is_deleted: boolean;
  is_verified: boolean;
  institution_id: number | null;
  created_at: string;
  updated_at: string;
}

type UserProfileBase = Omit<User, "role">;

export type UserProfile =
  | (UserProfileBase & {
      role: "STUDENT";
      student: StudentDetails | null;
      teacher?: never;
    })
  | (UserProfileBase & {
      role: "TEACHER";
      teacher: TeacherDetails | null;
      student?: never;
    })
  | (UserProfileBase & {
      role: "INSTITUTION_ADMIN" | "SUPER_ADMIN";
      student?: never;
      teacher?: never;
    });
