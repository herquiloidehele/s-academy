"use server";

import UsersManager from "@/app/backend/business/users/UsersManager";
import { ITutor } from "@/app/backend/business/auth/UsersData";
import { ITutorSignupForm } from "@/components/tutor-complete-signup/FormSchema";

export async function getTutorByUserId(userId: string): Promise<ITutor | undefined> {
  return await UsersManager.getTutorByUserId(userId);
}

export async function createOrUpdateTutor(tutor: ITutorSignupForm): Promise<void> {
  return await UsersManager.createOrUpdateTutor(tutor);
}
