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
  const setIsOpen = useMenuStore((state) => state.setIsOpen);
  const [isOpenedSubmenu, setIsOpenedSubmenu] = React.useState(true);
  const pathName = usePathname();
  const isOpened = useMenuStore((state) => state.isOpened);

  function onClickMenuHandle() {
    if (menu.items.length === 0 && menu.onClick) {
      menu.onClick();
    } else {
      setIsOpen(true);
      setIsOpenedSubmenu((prevState) => !prevState);
    }
  }

  const CategoryTitle = () => (
    <div
      onClick={onClickMenuHandle}
      className={`flex flex-row cursor-pointer px-4  py-3 gap-6 ${isOpened ? "pr-16" : "px-3"}  ${isSingleMenuActive(menu.path) && menu.items.length == 0 ? "bg-active text-active-foreground" : ""}  `}
    >
      <div>{menu.icon}</div>

      <span className={` text-textOnPrimary  text-md font-semibold ${isOpened ? "block" : "hidden"}`}>
        {menu.title}
      </span>

      <div className={`flex flex-row items-center justify-center`}>
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
    return normalizedPathName.startsWith(normalizedItemPath);
  }

  return (
    <div className="w-full">
      <CategoryTitle />
      {isOpenedSubmenu &&
        isOpened &&
        menu.items.length > 0 &&
        menu.items.map((item, index) => {
          return (
            <div
              key={index}
              className={` cursor-pointer ${isMenuActive(item.path) ? "bg-active text-active-foreground" : ""} grid grid-cols-5 w-full py-3 gap-2`}
            >
              <span className=" block text-lg font-light col-start-2 col-span-3" onClick={item.onClick}>
                {item.title}
              </span>
            </div>
          );
        })}
    </div>
  );
}

export default MenuItem;
