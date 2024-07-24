"use client";
import React from "react";
import { usePathname } from "next/navigation";
import MenuItem, { ISidebarMenu } from "@/components/sidebar/MenuItem";

interface ISideMenuProps {
  menuItems: ISidebarMenu[];
}

function Sidebar({ menuItems }:ISideMenuProps) {
  const pathName = usePathname();


  return (
    <div>
      <ul className="h-fit">
        {menuItems.map((menu, index) => {
          const isActive = pathName.startsWith(`/${menu.path}`);
          return (
            <li key={index}>
              <MenuItem menu={{ ...menu, isActive }}></MenuItem>
            </li>
          );
        })}
      </ul>

    </div>
  );
}

export default Sidebar;