"use client";
import React from "react";
import { Bars3Icon,ArrowLeftIcon } from "@heroicons/react/24/outline";
import useMenuStore from "@/app/menuStore";

function Navbar() {
  const isOpened = useMenuStore((state) => state.isOpened);
  const setIsOpen = useMenuStore((state) => state.setIsOpen);
  return (
    <div className="flex flex-row">
      <div className="py-4 px-8 cursor-pointer" >
        {
          isOpened?  <ArrowLeftIcon className="w-4 h-4 md:w-8 md:h-8" onClick={()=>setIsOpen(false)}/>:<Bars3Icon className="w-4 h-4 md:w-8 md:h-8" onClick={()=>setIsOpen(true)}/>
        }

      </div>
    </div>
  );
}

export default Navbar;