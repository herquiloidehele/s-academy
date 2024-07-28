import * as React from "react";
import TutorCompleteSignup from "@/components/tutor-complete-signup/TutorCompleteSignup";
import { redirect } from "next/navigation";
import { Constants } from "@/utils/Constants";
import getAuthUser from "@/app/backend/actions/auth";
import Logger from "@/utils/Logger";
import Header from "@/components/header/Header";
import { getTutorByUserId } from "@/app/backend/actions/users";

export default async function page() {
  const authUser = await getAuthUser();

  if (!authUser) {
    Logger.error("TutorCompleteSignupPage", "User not found in session", [authUser]);
    redirect(Constants.APP_ROUTES.HOME);
  }

  const existingTutor = await getTutorByUserId(authUser.id);

  if (existingTutor) {
    Logger.info("TutorCompleteSignupPage", "Tutor already exists", [authUser]);
    redirect(Constants.APP_ROUTES.TEACHER.HOME);
  }

  return (
    <div>
      <Header solidBg />
      <TutorCompleteSignup user={authUser} />
    </div>
  );
}
