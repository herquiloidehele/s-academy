"use client";

import { useMemo, useState } from "react";
import AppLogo from "@/assets/icons/logo.svg";
import { useScrollPosition } from "@/utils/customHooks";
import { clsx } from "clsx";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";

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
      className={clsx(`fixed top-0 left-0 w-full z-[200] flex justify-center px-4 py-4 lg:px-8 lg:py-6`, {
        "shadow-lg bg-white": isSticky,
      })}
    >
      <div className="max-w-[1300px] mx-auto flex items-center justify-between w-full">
        <AppLogo className="h-5 md:6 lg:h-8 w-auto" />

        <ul className="flex items-center gap-6">
          <li>
            <a
              href="#"
              className={clsx("text-stale-950 font-medium text-sm lg:text-md", {
                "text-green-400": isSticky,
                "text-white": !isSticky,
              })}
            >
              Entrar
            </a>
          </li>

          <li>
            <ButtonElement
              type={ButtonType.PRIMARY}
              fillType={FillType.FILLED}
              size={ButtonSize.SMALL}
              shape={ButtonShape.ROUNDED}
              shadow
            >
              Inscrição
            </ButtonElement>
          </li>
        </ul>
      </div>
    </header>
  );
}
