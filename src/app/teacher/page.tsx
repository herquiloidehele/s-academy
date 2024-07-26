"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Constants } from "@/utils/Constants";

function Page(props) {
  const router = useRouter();

  router.push(Constants.APP_ROUTES.TEACHER.HOME);
  return <div></div>;
}

export default Page;
