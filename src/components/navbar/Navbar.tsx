"use client";
import React from "react";
import {
  ArrowLeftIcon,
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import useMenuStore from "@/app/menuStore";
import AppLogo from "../../assets/icons/logo.svg";

import { useRouter } from "next/navigation";
import UserMenu, { IUserMenuItem } from "@/components/navbar/UserMenu";
import { User2Icon } from "lucide-react";
import useAuthStore from "@/app/complete-auth/authStore";

function Navbar() {
  const isOpened = useMenuStore((state) => state.isOpened);
  const setIsOpen = useMenuStore((state) => state.setIsOpen);
  const router = useRouter();
  const loggedUser = useAuthStore((state) => state.user);
  const userMenuItems: IUserMenuItem[] = [
    {
      title: "Minha Conta",
      onClick: () => router.push("/teacher/account"),
      icon: <User2Icon className="size-6 font-light self-center text-indigo-600 stroke-1 text-xm " />,
      backgroundIconColor: "bg-indigo-100",
    },
    {
      title: "Ajuda",
      onClick: () => router.push("/teacher/account"),
      icon: <InformationCircleIcon className="size-6 font-light self-center text-yellow-600 stroke-1 text-xm " />,
      backgroundIconColor: "bg-yellow-100",
    },
    {
      title: "Sair",
      onClick: () => router.push("/teacher/account"),
      icon: <ArrowRightStartOnRectangleIcon className="size-6 font-light self-center text-red-600 stroke-1 text-xm " />,
      backgroundIconColor: "bg-red-100",
    },
  ];
  return (
    <div className="flex flex-row w-full justify-start">
      <div className="py-4 px-8 cursor-pointer">
        {isOpened ? (
          <ArrowLeftIcon className="w-4 h-4 md:w-8 md:h-8" onClick={() => setIsOpen(false)} />
        ) : (
          <Bars3Icon className="w-4 h-4 md:w-8 md:h-8" onClick={() => setIsOpen(true)} />
        )}
      </div>
      <div className="flex items-center justify-center bg-white w-32 h-16 rounded-l">
        <AppLogo className="h-12 lg:h-7 w-auto" />
      </div>

      <div className="ml-auto self-center">
        <UserMenu
          menuItems={userMenuItems}
          email={loggedUser?.email || "erciliomarquesmanhica@gmail.com"}
          userName={loggedUser?.email || "Ercilio Marques Manhica"}
        >
          <User2Icon className="size-10 font-light self-center ml-auto stroke-1 text-xm mr-3 rounded-full border-2 border-green-600" />
        </UserMenu>
      </div>
    </div>
  );
}

export default Navbar;
