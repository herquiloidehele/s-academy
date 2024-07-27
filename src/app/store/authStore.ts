import { create } from "zustand";
import { IUser } from "@/app/backend/business/auth/UsersData";
import { USER_ROLES } from "@/utils/Constants";

export const useAuthStore = create((set) => ({
  user: undefined,
  hasLoaded: false,
  setAuthUser: (user: IUser) => set({ user, hasLoaded: true }),
  resetAuthUser: () => set({ user: undefined, hasLoaded: true }),
}));

export const authSelectors = {
  getUser: (state): IUser | undefined => state.user,
  hasLoaded: (state): boolean => state.hasLoaded,
  isGuest: (state): boolean => state.hasLoaded && !state.user,
  isTutor: (state): boolean => state.hasLoaded && state.user?.role === USER_ROLES.TUTOR,
  isStudent: (state): boolean => state.hasLoaded && state.user?.role === USER_ROLES.STUDENT,
  isAdmin: (state): boolean => state.hasLoaded && state.user?.role === USER_ROLES.ADMIN,
};

export const authActions = {
  setAuthUser: (state) => state.setAuthUser,
  resetAuthUser: (state) => state.resetAuthUser,
};
