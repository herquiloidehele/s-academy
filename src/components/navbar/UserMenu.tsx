import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { User2Icon } from "lucide-react";


export interface IUserMenuItem {
  title: string;
  onClick: () => void;
  icon: React.ReactElement;
}
function UserMenu({children, menuItems, userName, email}:{children: React.ReactElement, menuItems: IUserMenuItem[], userName: string, email: string}) {

  return (
    <Popover>
      <PopoverTrigger>
        {children}
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col-2 gap-2">
            <User2Icon className="size-12 font-extralight col-span-2 self-center stroke-1 text-xm mr-3 rounded-full border-2 border-green-600" />
            <div className="flex flex-col">
              <span className="font-extralight">{userName}</span>
              <span className="font-extralight text-xs"> {email}</span>
            </div>
          </div>
          <hr className="mb-4" />
          <div className="flex flex-col gap-3">

            {menuItems&&
              menuItems.map((menuItem) => (
                <div className="flex flex-row gap-2 items-center pl-3 cursor-pointer" key={menuItem.title}
                     onClick={menuItem.onClick}>
                  {menuItem.icon}
                  <span className="font-extralight text-sm">{menuItem.title}</span>
                </div>
              ))
            }
          </div>
        </div>
      </PopoverContent>
    </Popover>

  );
}

export default UserMenu;