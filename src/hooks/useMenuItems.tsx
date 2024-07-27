import React from "react";
import { useRouter } from "next/navigation";
import { Constants, USER_ROLES } from "@/utils/Constants";
import { ISidebarMenu } from "@/components/sidebar/MenuItem";
import { FolderIcon, HomeIcon, WalletIcon } from "@heroicons/react/24/outline";

export const useMenuItems = () => {
  const router = useRouter();

  const menuItems: ISidebarMenu[] = [
    {
      key: Constants.APP_ROUTES.TEACHER.HOME,
      path: Constants.APP_ROUTES.TEACHER.HOME,
      title: "Início",
      permissions: [USER_ROLES.TUTOR],
      icon: <HomeIcon className="w-3 h-3 md:w-6 md:h-6  stroke-1 text-md" />,
      onClick: () => {
        router.push(Constants.APP_ROUTES.TEACHER.HOME);
      },
      items: [],
    },

    {
      key: Constants.APP_ROUTES.TEACHER.COURSES,
      path: Constants.APP_ROUTES.TEACHER.COURSES,
      title: "Cursos",
      permissions: [USER_ROLES.TUTOR],
      icon: <FolderIcon className="w-3 h-3 md:w-6 md:h-6  stroke-1 text-md" />,
      onClick: () => {
        router.push(Constants.APP_ROUTES.TEACHER.COURSES);
      },
      items: [],
    },

    {
      key: Constants.APP_ROUTES.TEACHER.WALLET.HOME,
      path: Constants.APP_ROUTES.TEACHER.WALLET.HOME,
      title: "Carteira",
      permissions: [USER_ROLES.TUTOR],
      icon: <WalletIcon className="w-3 h-3 md:w-6 md:h-6  stroke-1 text-md" />,
      onClick: () => {
        router.push(Constants.APP_ROUTES.TEACHER.WALLET.HOME);
      },
      items: [],
    },
  ];

  const getMenuItemsByRole = (userRole: USER_ROLES, exludeMenus: string[]) => {
    return menuItems
      .filter((menuItem) => menuItem.permissions?.includes(userRole))
      .filter((menuItem) => !exludeMenus.includes(menuItem.key));
  };

  return { getMenuItemsByRole };
};
