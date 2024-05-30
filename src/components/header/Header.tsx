"use client";

import { useMemo, useState } from "react";
import AppLogo from "@/assets/icons/logo.svg";
import { useScrollPosition } from "@/utils/customHooks";
import { clsx } from "clsx";
import { Constants } from "@/utils/Constants";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const START_STICKY_POSITION = 10;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { y: scrollPosition } = useScrollPosition();

  const transparentHeader = useMemo(() => {
    return scrollPosition < START_STICKY_POSITION;
  }, [scrollPosition]);

  const isSticky = useMemo(() => {
    return scrollPosition > START_STICKY_POSITION;
  }, [scrollPosition]);

  return (
    <header
      className={clsx(`fixed top-0 left-0 w-full h-[${Constants.UI.HEADER_HEIGHT}] z-[200] flex justify-center px-8`, {
        "shadow-lg": isSticky,
      })}
    >
      <div className="max-w-[1300px] mx-auto flex items-center justify-between w-full">
        <AppLogo className="h-7 w-auto" />

        <ul className="flex items-center gap-6">
          <li>
            <a href="#" className="text-stale-950 font-medium">
              Entrar
            </a>
          </li>

          <li>
            <a
              href="#"
              className="bg-green-400 text-white text-md font-medium py-[12px] px-[20px] rounded-3xl hover:bg-green-500"
            >
              Começar Agora
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
