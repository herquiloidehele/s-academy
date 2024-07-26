export enum UserRole {
  ADMIN = "admin",
  STUDENT = "student",
  TUTOR = "tutor",
}
export interface IUser {
  id: string;
  email: string;
  role: UserRole;
}
