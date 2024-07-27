import { create } from "zustand";
import { IUser } from "@/app/backend/business/auth/UsersData";
import { USER_ROLES } from "@/utils/Constants";

export const useAuthStore = create((set) => ({
  user: undefined,
  hasLoaded: false,
  setAuthUser: (user: IUser) => set({ user, hasLoaded: true }),
}));

export const authSelectors = {
  getUser: (state): IUser | undefined => state.user,
  hasLoaded: (state): boolean => state.hasLoaded,
  isTutor: (state): boolean => state.hasLoaded && state.user?.role === USER_ROLES.TUTOR,
  isAdmin: (state): boolean => state.hasLoaded && state.user?.role === USER_ROLES.ADMIN,
  isStudent: (state): boolean => state.hasLoaded && state.user?.role === USER_ROLES.STUDENT,
  isGuest: (state): boolean => state.hasLoaded && !state.user,
};

export const authActions = {
  setAuthUser: (state) => state.setAuthUser,
};
