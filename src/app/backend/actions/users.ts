import UsersManager from "@/app/backend/business/users/UsersManager";
import { ITutor } from "@/app/backend/business/auth/UsersData";

export async function getTutorByUserId(userId: string): Promise<ITutor | undefined> {
  return await UsersManager.getTutorByUserId(userId);
}
