import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { User2Icon } from "lucide-react";

export interface IUserMenuItem {
  title: string;
  onClick: () => void;
  icon: React.ReactElement;
  backgroundIconColor?: string;
  iconColor?: string;
}

function UserMenu({
  children,
  menuItems,
  userName,
  email,
}: {
  children: React.ReactElement;
  menuItems: IUserMenuItem[];
  userName: string;
  email: string;
}) {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="p-4 w-full">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col-2 gap-2">
            <User2Icon className="size-10 font-light self-center ml-auto stroke-1 text-xm mr-3 rounded-full border-2 border-green-600" />
            <div className="flex flex-col">
              <span className="block font-semibold text-gray-800">{userName}</span>
              <span className="block text-sm text-gray-500">{email}</span>
            </div>
          </div>
          <hr className="my-2 border-gray-300" />
          <div className="flex flex-col gap-3">
            {menuItems.map((menuItem) => (
              <div
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                key={menuItem.title}
                onClick={menuItem.onClick}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${menuItem.backgroundIconColor}`}
                  aria-hidden="true"
                >
                  {menuItem.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">{menuItem.title}</span>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default UserMenu;
