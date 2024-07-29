"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Constants } from "@/utils/Constants";
import useTutorStore from "@/app/tutor/tutorStore";

function Page(props) {
  const router = useRouter();
  const setLoggedTutor = useTutorStore((state) => state.setLoggedTutor);

  useEffect(() => {
    const fetchTutor = async () => {
      await setLoggedTutor();
    };
    fetchTutor();
  }, []);

  router.push(Constants.APP_ROUTES.TEACHER.HOME);
  return <div></div>;
}

export default Page;
