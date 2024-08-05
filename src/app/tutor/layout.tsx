import { USER_ROLES } from "@/utils/Constants";
import ProtectedRoutes from "@/components/protected-routes/ProtectedRoutes";
import React from "react";
import TutorLayoutContent from "@/components/tutor-layout-content/TutorLayoutContent";
import useTutorStore from "@/app/tutor/tutorStore";

const Layout = async ({ children }) => {
  await useTutorStore.getState?.().setLoggedTutor();

  return (
    <ProtectedRoutes allowedRoles={[USER_ROLES.TUTOR]}>
      <TutorLayoutContent>{children}</TutorLayoutContent>
    </ProtectedRoutes>
  );
};

export default Layout;
