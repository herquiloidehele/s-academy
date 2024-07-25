"use client";

import React from "react";
import { USER_ROLES } from "@/utils/Constants";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import useMenuStore from "@/app/menuStore";
import { usePathname } from "next/navigation";

export interface ISidebarSubMenuItem {
  title: string;
  path: string;
  onClick?: () => void;
}
export interface ISidebarMenu {
  key: string;
  title: string;
  icon: React.ReactElement;
  path: string;
  items: ISidebarSubMenuItem[];
  isActive?: boolean;
  onClick?: () => void;
  permissions?: USER_ROLES[];
}

function MenuItem({ menu }: { menu: ISidebarMenu }) {
  const isOpened = useMenuStore((state) => state.isOpened);
  const setIsOpen = useMenuStore((state) => state.setIsOpen);
  const [isOpenedSubmenu, setIsOpenedSubmenu] = React.useState(true);
  const pathName = usePathname();

  const CategoryTitle = () => (
    <div
      onClick={() => {
        if (menu.items.length === 0 && menu.onClick) {
          menu.onClick();
        } else {
          setIsOpen(true);
          setIsOpenedSubmenu((prevState) => !prevState);
        }
      }}
      className={`cursor-pointer ${isSingleMenuActive(menu.path) && menu.items.length == 0 ? "bg-green-100" : ""} ${!isOpened ? `p-5 w-fit ${menu.isActive ? "bg-green-100" : ""}` : "grid grid-cols-5 w-full py-5 gap-2 "} ${!isOpenedSubmenu ? "bg-green-100" : ""} px-4`}
    >
      <div className="col-span-1">{menu.icon}</div>

      <span className={`block col-span-3 text-textOnPrimary  text-md font-extralight ${isOpened ? "block" : "hidden"}`}>
        {menu.title}
      </span>

      <div className={`flex flex-row items-center col-span-1 justify-center ${isOpened ? "block" : "hidden"}`}>
        {menu.items.length > 0 &&
          (isOpenedSubmenu ? (
            <ArrowUpIcon className="stroke-1 size-3" onClick={() => setIsOpenedSubmenu(false)} />
          ) : (
            <ArrowDownIcon className="stroke-1 size-3" onClick={() => setIsOpenedSubmenu(true)} />
          ))}
      </div>
    </div>
  );

  function isMenuActive(path: string) {
    const normalizedPathName = pathName.trim().toLowerCase();
    const normalizedItemPath = `${path.trim().toLowerCase()}`;
    const isActive = normalizedPathName.startsWith(normalizedItemPath);

    if (isActive) {
      menu.isActive = true;
      return true;
    }
    return false;
  }
  function isSingleMenuActive(path: string) {
    const normalizedPathName = pathName.trim().toLowerCase();
    const normalizedItemPath = `${path.trim().toLowerCase()}`;
    return normalizedPathName == normalizedItemPath;
  }

  return (
    <div className="w-full ">
      <CategoryTitle />
      {isOpenedSubmenu &&
        isOpened &&
        menu.items.length > 0 &&
        menu.items.map((item, index) => {
          return (
            <div
              key={index}
              className={` cursor-pointer focus:bg-primary ${isMenuActive(item.path) ? "bg-green-400 text-primary-foreground" : ""} ${!isOpened ? "px-5 w-fit" : "grid grid-cols-5 w-full py-3 gap-2"}`}
            >
              <span className=" block text-lg font-extralight col-start-2 col-span-3" onClick={item.onClick}>
                {item.title}
              </span>
            </div>
          );
        })}
    </div>
  );
}

export default MenuItem;
