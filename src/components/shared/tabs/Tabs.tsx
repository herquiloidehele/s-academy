"use client";

import { useState } from "react";

export interface ITabItem {
  title: string;
  value: string;
  icon?: JSX.Element;
  element?: JSX.Element;
  disabled?: boolean;
}

interface ITabsProps {
  items: ITabItem[];
  activeItem?: string;
  onTabChange?: (item: ITabItem) => void;
}
export default function Tabs(props: ITabsProps) {
  const [activeItem, setActiveItem] = useState(props.activeItem || props.items[0].value);

  return (
    <div className={""}>
      <div className="border-b border-gray-200 dark:border-neutral-700">
        <nav className="flex gap-x-3" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
          {props.items.map((item, index) => (
            <button
              key={index}
              type="button"
              className={`hs-tab-active:font-semibold hs-tab-active:border-green-400 hs-tab-active:text-green-400 py-4 px-1 inline-flex items-center gap-x-1 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-green-600 focus:outline-none focus:text-green-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-green-500 ${activeItem === item.value ? "active" : ""}`}
              id={`tabs-with-underline-item-${index}`}
              aria-selected={activeItem === item.value}
              data-hs-tab={`#tabs-with-underline-${index}`}
              aria-controls={`tabs-with-underline-${index}`}
              role="tab"
              onClick={() => setActiveItem(item.value)}
              disabled={item.disabled}
            >
              {item.title}
              {item.icon}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-3">
        {props.items.map((item, index) => (
          <div
            key={index}
            id={`tabs-with-underline-${index}`}
            className={`hs-tab-pane ${activeItem === item.value ? "active" : "hidden"}`}
            role="tabpanel"
            aria-labelledby={`tabs-with-underline-item-${index}`}
          >
            {item.element}
          </div>
        ))}
      </div>
    </div>
  );
}
