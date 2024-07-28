"use client";

import { ReactNode, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import getAuthUser from "@/app/backend/actions/auth";
import { IUser } from "@/app/backend/business/auth/UsersData";
import { authActions, useAuthStore } from "@/app/store/authStore";

interface AuthProviderProps {
  children: ReactNode;
}
export default function AuthProvider(props: AuthProviderProps) {
  const setAuthUser = useAuthStore(authActions.setAuthUser);

  const { mutate } = useMutation({
    mutationKey: ["getAuthUser"],
    mutationFn: () => getAuthUser(),
    onSuccess: (user: IUser) => {
      setAuthUser(user);
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  return <>{props.children}</>;
}
