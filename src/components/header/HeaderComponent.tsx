"use client";

import { useMemo, useState } from "react";
import AppLogo from "@/assets/icons/logo.svg";
import { useScrollPosition } from "@/utils/customHooks";
import { clsx } from "clsx";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";
import { Constants } from "@/utils/Constants";
import { useRouter } from "next/navigation";
import { handleLogout } from "@/app/actions/auth";
import LoginModal from "@/components/login-modal/LoginModal";
import Link from "next/link";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const START_STICKY_POSITION = 10;

interface HeaderProps {
  solidBg?: boolean;
  isAuthenticated?: any;
}
export default function HeaderComponent(props: HeaderProps) {
  const [modalOpen, setModalOpen] = useState(false);

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

        {!props.isAuthenticated ? (
          <ul className="flex items-center gap-6">
            <li>
              <a
                href="#"
                className={clsx("text-stale-950 font-medium text-sm lg:text-md", {
                  "text-green-400": isSticky,
                  "text-white": !isSticky,
                })}
                onClick={(e) => {
                  e.preventDefault();
                  setModalOpen(true);
                }}
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
          <div className={"flex items-center gap-6"}>
            <Link
              href={Constants.APP_ROUTES.COURSE}
              className={clsx("text-stale-950 font-medium text-sm lg:text-md", {
                "text-green-400": isSticky,
                "text-white": !isSticky,
              })}
            >
              Curso
            </Link>

            <form action={handleLogout}>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                type={"submit"}
                value={Constants.AUTH_PROVIDER.GOOGLE}
              >
                Sair
              </button>
            </form>
          </div>
        )}
      </div>

      <LoginModal open={modalOpen} onChange={setModalOpen} />
    </header>
  );
}
