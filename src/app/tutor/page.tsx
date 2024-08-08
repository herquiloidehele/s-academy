import React from "react";
import { redirect } from "next/navigation";
import { Constants } from "@/utils/Constants";

async function Page() {
  redirect(Constants.APP_ROUTES.TEACHER.HOME);
  return <div></div>;
}

export default Page;
