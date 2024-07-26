"use client";

import Navbar from "@/components/Navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import { useMenuItems } from "@/hooks/useMenuItems";
import { USER_ROLES } from "@/utils/Constants";
import React, { useEffect } from "react";
import useAuthStore from "@/app/complete-auth/authStore";
import useMenuStore from "@/app/menuStore";

const Layout = ({ children }) => {
  const { getMenuItemsByRole } = useMenuItems();
  const setLoggedUser = useAuthStore((state) => state.setLoggedUser);
  const isOpened = useMenuStore((state) => state.isOpened);

  useEffect(() => {
    const asyncFunction = async () => {
      await setLoggedUser();
    };

    asyncFunction();
  }, []);
  return (
    <div className="flex flex-col w-full overflow-y-hidden fixed">
      <div className="flex w-full border-b-2 fixed ">
        <Navbar></Navbar>
      </div>

      <div className="flex flex-row gap-4 w-full h-screen mt-16">
        <div
          className={`h-screen bg-gradient-to-br from-green-400 to-green-800  transition duration-300 ease-in-out ${isOpened ? "w-fit" : "w-[80px]"}`}
        >
          <Sidebar menuItems={getMenuItemsByRole(USER_ROLES.TEACHER, [])}></Sidebar>
        </div>
        <div className="overflow-y-auto bg-background items-center w-full p-12">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
