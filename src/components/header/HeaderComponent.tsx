"use client";

import { useMemo, useState } from "react";
import AppLogo from "@/assets/icons/logo.svg";
import { useScrollPosition } from "@/utils/customHooks";
import { clsx } from "clsx";
import { Constants } from "@/utils/Constants";
import { useRouter } from "next/navigation";
import { handleLogout } from "@/app/backend/actions/auth";
import GenericSignupModal from "@/components/generic-signup-modal/GenericSignupModal";
import { SignupType } from "@/utils/interfaces";
import { authActions, authSelectors, useAuthStore } from "@/app/store/authStore";
import MenuItem, { IMenuItem, MenuActionType } from "@/components/header/MenuItem";

const START_STICKY_POSITION = 10;

interface HeaderProps {
  solidBg?: boolean;
  isAuthenticated?: any;
}
export default function HeaderComponent(props: HeaderProps) {
  const [isOpenTutorSignupModal, setIsOpenTutorSignupModal] = useState(false);
  const [signInType, setSignInType] = useState<SignupType>();

  const isTutor = useAuthStore(authSelectors.isTutor);
  const isStudent = useAuthStore(authSelectors.isStudent);
  const isGuest = useAuthStore(authSelectors.isGuest);
  const resetAuthUser = useAuthStore(authActions.resetAuthUser);

  const { y: scrollPosition } = useScrollPosition();

  const router = useRouter();

  const isSticky = useMemo(() => {
    return scrollPosition > START_STICKY_POSITION;
  }, [scrollPosition]);

  const onClickLogout = () => {
    handleLogout().then(() => {
      resetAuthUser();
      router.push(Constants.APP_ROUTES.HOME);
    });
  };

  const menuItems = useMemo((): IMenuItem[] => {
    if (isGuest) {
      return [
        { text: "Cursos", actionType: MenuActionType.LINK, href: `#${Constants.UI.SECTIONS.COURSES}` },
        {
          text: "Vender meu curso",
          actionType: MenuActionType.ACTION,
          action: () => {
            setSignInType(SignupType.TUTOR_SIGN_UP);
            setIsOpenTutorSignupModal(true);
          },
        },
        {
          text: "Entrar",
          actionType: MenuActionType.BUTTON,
          action: () => {
            setSignInType(SignupType.GENERAL_LOGIN);
            setIsOpenTutorSignupModal(true);
          },
        },
      ];
    }

    if (isTutor) {
      return [
        { text: "Cursos", actionType: MenuActionType.LINK, href: `#${Constants.UI.SECTIONS.COURSES}` },
        {
          text: "Meus Cursos",
          actionType: MenuActionType.LINK,
          href: Constants.APP_ROUTES.TEACHER.HOME,
        },
        {
          text: "Sair",
          actionType: MenuActionType.BUTTON,
          action: onClickLogout,
        },
      ];
    }

    if (isStudent) {
      return [
        { text: "Cursos", actionType: MenuActionType.LINK, href: `#${Constants.UI.SECTIONS.COURSES}` },
        {
          text: "Minha conta",
          actionType: MenuActionType.LINK,
          href: Constants.APP_ROUTES.COURSES,
        },
        {
          text: "Sair",
          actionType: MenuActionType.BUTTON,
          action: onClickLogout,
        },
      ];
    }

    return [];
  }, [isGuest, isTutor, isStudent, onClickLogout]);

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

        <ul className="flex items-center gap-6">
          {menuItems.map((menuItem, index) => (
            <MenuItem key={index} menuItem={menuItem} />
          ))}
        </ul>
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
