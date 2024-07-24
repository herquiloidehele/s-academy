"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { USER_ROLES } from "@/utils/Constants";
import { ArrowUpIcon,ArrowDownIcon } from "@heroicons/react/24/outline";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import useMenuStore from "@/app/menuStore";

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

function MenuItem({ menu }: { menu:ISidebarMenu  }) {
  const [stateClass, setStateClass] = React.useState("");
  const isOpened = useMenuStore((state) => state.isOpened);
  const setIsOpen = useMenuStore((state) => state.setIsOpen);
  const[isOpenedSubmenu, setIsOpenedSubmenu] = React.useState(false);

  useEffect(() => {
    const stateClass = menu.isActive ? "bg-primary text-primary-foreground" : "";
    setStateClass(stateClass);
  }, [menu.isActive]);
  const CategoryTitle = () => (
    <div
      onClick={ ()=> {
        if(menu.items.length === 0 && menu.onClick){
          menu.onClick();
        } else {
          setIsOpen(true);
        setIsOpenedSubmenu((prevState)=>!prevState);
        }
      }}
      className={`cursor-pointer ${stateClass}${!isOpened?"p-5 w-fit":"grid grid-cols-5 w-full py-5 gap-2 "}`}
    >
      <div className="col-span-1" >
        {menu.icon}
      </div>

      <span className={`block col-span-3 text-textOnPrimary  text-md font-extralight ${isOpened?"block":"hidden"}`}>
        {menu.title}
      </span>

      <div className={`flex flex-row items-center col-span-1 justify-center ${isOpened?"block":"hidden"}`}>
        {
          menu.items.length>0 && (
            isOpenedSubmenu? <ArrowUpIcon className="stroke-1 size-3" onClick={()=>setIsOpenedSubmenu(false)}/>:<ArrowDownIcon className="stroke-1 size-3" onClick={()=>setIsOpenedSubmenu(true)}/>
          )
        }
      </div>

    </div>
  );

  return (
    <div className="w-full px-4 ">
      <CategoryTitle  />
      {
        isOpenedSubmenu && isOpened && menu.items.length>0 && (
        menu.items.map((item, index) => (
              <div className={` cursor-pointer focus:bg-primary ${stateClass} ${!isOpened?"p-5 w-fit":"grid grid-cols-5 w-full py-3 gap-2"}`}>
              <span className=" block text-lg font-extralight col-start-2 col-span-3" onClick={item.onClick}>{item.title}</span>
            </div>
          )
        ))
      }

    </div>
  );
}

export default MenuItem;
