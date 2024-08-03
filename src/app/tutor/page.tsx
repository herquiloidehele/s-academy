import React from "react";
import { redirect } from "next/navigation";
import { Constants } from "@/utils/Constants";
import useTutorStore from "@/app/tutor/tutorStore";

async function Page() {
  const setLoggedTutor = useTutorStore.getState?.().setLoggedTutor;

  if (setLoggedTutor) {
    await setLoggedTutor();
  }

  redirect(Constants.APP_ROUTES.TEACHER.HOME);
  return <div></div>;
}

export default Page;
