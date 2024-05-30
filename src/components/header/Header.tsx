"use client";

import { useMemo, useState } from "react";
import AppLogo from "@/assets/icons/logo.svg";
import { useScrollPosition } from "@/utils/customHooks";
import { clsx } from "clsx";

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
      className={clsx(`fixed top-0 left-0 w-full z-[200] flex justify-center px-8 py-6`, {
        "shadow-lg bg-white": isSticky,
      })}
    >
      <div className="max-w-[1300px] mx-auto flex items-center justify-between w-full">
        <AppLogo className="h-8 w-auto" />

        <ul className="flex items-center gap-6">
          <li>
            <a href="#" className="text-stale-950 font-medium text-white">
              Entrar
            </a>
          </li>

          <li>
            <a
              href="#"
              className="bg-green-400 text-white text-md font-medium py-[12px] px-[20px] rounded-3xl hover:bg-green-300 shadow-green-400 shadow-2xl shadow-[5px_3px_60px_-8px]"
            >
              Inscrição
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
