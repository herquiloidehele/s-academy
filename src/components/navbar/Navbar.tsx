"use client";
import React from "react";
import { Bars3Icon,ArrowLeftIcon } from "@heroicons/react/24/outline";
import useMenuStore from "@/app/menuStore";

function Navbar() {
  const isOpened = useMenuStore((state) => state.isOpened);
  const setIsOpen = useMenuStore((state) => state.setIsOpen);
  return (
    <div className="flex flex-row">
      <div className="p-4 cursor-pointer" >
        {
          isOpened?  <Bars3Icon className="w-4 h-4 md:w-8 md:h-8" onClick={()=>setIsOpen(false)}/>:<ArrowLeftIcon className="w-4 h-4 md:w-8 md:h-8" onClick={()=>setIsOpen(true)}/>
        }

      </div>
    </div>
  );
}

export default Navbar;