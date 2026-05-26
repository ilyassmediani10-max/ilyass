export type UserRole = "ADMIN" | "USER";

export type AuthUser = {
  email: string;
  id: string;
  name: string;
  role: UserRole;
};
