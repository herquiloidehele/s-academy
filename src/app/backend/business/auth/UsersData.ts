export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}
export interface IUser {
  id: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}
