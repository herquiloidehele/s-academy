"use server";

import { Constants } from "@/utils/Constants";

import { signIn, signOut } from "@/auth";

export async function handleSocialLogin(formData: FormData) {
  const provider = formData.get(Constants.ACTIONS.LOGIN);

  if (provider === Constants.AUTH_PROVIDER.GOOGLE) {
    await signIn(provider, { redirectTo: Constants.APP_ROUTES.COMPLETE_AUTH });
  }
}

export async function handleLogout() {
  await signOut({ redirectTo: Constants.APP_ROUTES.HOME, redirect: true });
}
