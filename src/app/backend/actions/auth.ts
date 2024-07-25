"use server";

import { Constants } from "@/utils/Constants";

import { signIn, signOut } from "@/auth";
import AuthManager from "@/app/backend/business/auth/AuthManager";

export async function handleSocialLogin(formData: FormData) {
  const provider = formData.get(Constants.ACTIONS.LOGIN);
  const courseId = formData.get("courseId") as string;

  if (provider === Constants.AUTH_PROVIDER.GOOGLE) {
    await signIn(provider, { redirectTo: `${Constants.APP_ROUTES.COMPLETE_AUTH}/?courseId=${courseId}` });
  }
}

export async function handleLogout() {
  await signOut({ redirectTo: Constants.APP_ROUTES.HOME });
}

export default async function getAuthUser() {
  return await AuthManager.getAuthUser();
}
