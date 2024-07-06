"use client";

import { useMemo } from "react";
import AppLogo from "@/assets/icons/logo.svg";
import { useScrollPosition } from "@/utils/customHooks";
import { clsx } from "clsx";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";
import { Constants } from "@/utils/Constants";
import { useRouter } from "next/navigation";
import { handleLogout } from "@/app/actions/auth";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const START_STICKY_POSITION = 10;

interface HeaderProps {
  solidBg?: boolean;
  user?: any;
}
export default function HeaderComponent(props: HeaderProps) {
  const { y: scrollPosition } = useScrollPosition();

  const router = useRouter();

  const isSticky = useMemo(() => {
    return scrollPosition > START_STICKY_POSITION;
  }, [scrollPosition]);

  return (
    <header
      className={clsx(`fixed top-0 left-0 w-full z-[200] flex justify-center px-4 py-4 lg:px-8 lg:py-6`, {
        "shadow-lg bg-white": isSticky,
        "bg-white border border-b-gray-100": props.solidBg,
      })}
    >
      <div className="max-w-[1300px] mx-auto flex items-center justify-between w-full">
        <AppLogo
          className="h-5 md:6 lg:h-8 w-auto cursor-pointer"
          onClick={() => {
            router.push(Constants.APP_ROUTES.HOME);
          }}
        />

        {!props.user ? (
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
                onClick={() => {
                  router.push(Constants.APP_ROUTES.CHECKOUT);
                }}
              >
                Inscrição
              </ButtonElement>
            </li>
          </ul>
        ) : (
          <form action={handleLogout}>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              type={"submit"}
              value={Constants.AUTH_PROVIDER.GOOGLE}
            >
              Sair
            </button>
          </form>
        )}
      </div>
    </header>
  );
}
