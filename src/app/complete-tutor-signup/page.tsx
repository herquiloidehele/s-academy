import * as React from "react";
import TutorCompleteSignup from "@/components/tutor-complete-signup/TutorCompleteSignup";
import { redirect } from "next/navigation";
import { Constants } from "@/utils/Constants";
import getAuthUser from "@/app/backend/actions/auth";
import Logger from "@/utils/Logger";

export default async function page() {
  const authUser = await getAuthUser();

  if (!authUser) {
    Logger.error("TutorCompleteSignupPage", "User not found in session", [authUser]);
    redirect(Constants.APP_ROUTES.HOME);
  }

  return <TutorCompleteSignup user={authUser} />;
}
