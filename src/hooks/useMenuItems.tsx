import React from "react";
import { useRouter } from "next/navigation";
import { Constants, USER_ROLES } from "@/utils/Constants";
import { ISidebarMenu } from "@/components/sidebar/MenuItem";
import { FolderIcon, HomeIcon, WalletIcon } from "@heroicons/react/24/outline";

export const useMenuItems = () => {
  const router = useRouter();

  const menuItems:ISidebarMenu[] = [
    {
      key: Constants.APP_ROUTES.TEACHER.HOME,
      path: Constants.APP_ROUTES.TEACHER.HOME,
      title: ("Home"),
      permissions: [USER_ROLES.TEACHER],
      icon: <HomeIcon  className="w-3 h-3 md:w-6 md:h-6 font-extralight stroke-1 text-md"/>,
      onClick: () => {
        router.push(Constants.APP_ROUTES.TEACHER.HOME);
      },
      items: [],

    },

    {
      key: Constants.APP_ROUTES.TEACHER.PRODUCTS,
      path: Constants.APP_ROUTES.TEACHER.PRODUCTS,
      title: ("Products"),
      permissions: [USER_ROLES.TEACHER],
      icon: <FolderIcon  className="w-3 h-3 md:w-6 md:h-6 font-extralight stroke-1 text-md"/>,
      onClick: () => {
        router.push(Constants.APP_ROUTES.TEACHER.PRODUCTS);
      },
      items: [{ title: "Courses", path: Constants.APP_ROUTES.TEACHER.COURSES,  onClick: () => router.push(Constants.APP_ROUTES.TEACHER.COURSES) }],

    },

    {
      key: Constants.APP_ROUTES.TEACHER.WALLET.HOME,
      path: Constants.APP_ROUTES.TEACHER.WALLET.HOME,
      title: ("Wallet"),
      permissions: [USER_ROLES.TEACHER],
      icon: <WalletIcon  className="w-3 h-3 md:w-6 md:h-6 font-extralight stroke-1 text-md"/>,
      onClick: () => {
        router.push(Constants.APP_ROUTES.TEACHER.WALLET.HOME);
      },
      items: [
        { title: "Balance", path: Constants.APP_ROUTES.TEACHER.WALLET.BALANCE,  onClick: () => router.push(Constants.APP_ROUTES.TEACHER.WALLET.BALANCE) },
        { title: "Withdraw", path: Constants.APP_ROUTES.TEACHER.WALLET.WITHDRAW,  onClick: () => router.push(Constants.APP_ROUTES.TEACHER.WALLET.WITHDRAW) }
      ],

    },

  ];

  const getMenuItemsByRole = (userRole: USER_ROLES, exludeMenus: string[]) => {
    return menuItems.filter((menuItem) => menuItem.permissions?.includes(userRole)).filter((menuItem) => !exludeMenus.includes(menuItem.key));
  };

  return { getMenuItemsByRole };
};
