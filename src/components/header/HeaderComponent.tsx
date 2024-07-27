"use client";

import { useMemo, useState } from "react";
import AppLogo from "@/assets/icons/logo.svg";
import { useScrollPosition } from "@/utils/customHooks";
import { clsx } from "clsx";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";
import { Constants } from "@/utils/Constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { handleLogout } from "@/app/backend/actions/auth";
import GenericSignupModal from "@/components/generic-signup-modal/GenericSignupModal";
import { SignupType } from "@/utils/interfaces";

const START_STICKY_POSITION = 10;

interface HeaderProps {
  solidBg?: boolean;
  isAuthenticated?: any;
}
export default function HeaderComponent(props: HeaderProps) {
  const [isOpenTutorSignupModal, setIsOpenTutorSignupModal] = useState(false);
  const [signInType, setSignInType] = useState<SignupType>();

  const { y: scrollPosition } = useScrollPosition();

  const router = useRouter();

  const isSticky = useMemo(() => {
    return scrollPosition > START_STICKY_POSITION;
  }, [scrollPosition]);

  return (
    <header
      className={clsx(`fixed top-0 left-0 w-full z-[10] flex justify-center px-4 py-4 lg:px-8 lg:py-6`, {
        "shadow-sm bg-white": isSticky,
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
            <li className={"hidden md:inline-block"}>
              <a
                href={`#${Constants.UI.SECTIONS.COURSES}`}
                className={clsx("text-stale-950 font-medium text-sm lg:text-md hover:text-green-400 text-black")}
              >
                Cursos
              </a>
            </li>

            <li className={"hidden md:inline-block"}>
              <div
                className={clsx("text-stale-950 font-medium text-sm lg:text-md hover:text-green-400 text-black")}
                onClick={() => {
                  setSignInType(SignupType.TUTOR_SIGN_UP);
                  setIsOpenTutorSignupModal(true);
                }}
              >
                Vender meu curso
              </div>
            </li>

            <li>
              <ButtonElement
                type={ButtonType.PRIMARY}
                fillType={FillType.FILLED}
                size={ButtonSize.SMALL}
                shape={ButtonShape.ROUNDED}
                shadow
                onClick={() => {
                  setSignInType(SignupType.GENERAL_LOGIN);
                  setIsOpenTutorSignupModal(true);
                }}
              >
                Entrar
              </ButtonElement>
            </li>
          </ul>
        ) : (
          <div className={"flex items-center gap-6"}>
            <Link
              href={`#${Constants.UI.SECTIONS.COURSES}`}
              className={clsx("text-stale-950 font-medium text-sm lg:text-md text-black", {})}
            >
              Cursos
            </Link>

            <a
              className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-400 text-white hover:bg-green-300 focus:outline-none focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
              href={`#`}
              onClick={async () => {
                await handleLogout();
              }}
            >
              Sair
            </a>
          </div>
        )}
      </div>

      <GenericSignupModal
        open={isOpenTutorSignupModal}
        onChange={(value) => {
          setSignInType(undefined);
          setIsOpenTutorSignupModal(value);
        }}
        signupModalType={signInType}
      />
    </header>
  );
}
