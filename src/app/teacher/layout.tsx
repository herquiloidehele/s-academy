"use client";

import Navbar from "@/components/Navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import { useMenuItems } from "@/hooks/useMenuItems";
import { USER_ROLES } from "@/utils/Constants";
import React, { useEffect } from "react";
import useAuthStore from "@/app/complete-auth/authStore";

const Layout = ({ children }) => {
  const { getMenuItemsByRole } = useMenuItems();
  const setLoggedUser = useAuthStore((state) => state.setLoggedUser);

  useEffect(() => {
    const asyncFunction = async () => {
      await setLoggedUser();
    };

    asyncFunction();
  }, []);
  return (
    <div className="flex flex-col w-full ">
      <div className="flex w-full border-b-2">
        <Navbar></Navbar>
      </div>

      <div className="grid grid-cols-5 w-full h-full">
        <div className="w-fit h-screen col-span-1 border-r-2 ">
          <Sidebar menuItems={getMenuItemsByRole(USER_ROLES.TEACHER, [])}></Sidebar>
        </div>
        <div className="overflow-y-auto bg-background items-center w-full  px-16 py-9">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
