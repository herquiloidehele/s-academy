import { create } from 'zustand';
import { IUser } from "@/app/backend/business/auth/UsersData";
import AuthManager from "@/app/backend/business/auth/AuthManager";
import Logger from "@/utils/Logger";

interface AuthStoreState {
  user: IUser | undefined;
  setLoggedUser: () => Promise<void>;
}

const useAuthStore = create<AuthStoreState>((set) => ({
  user: undefined,
  setLoggedUser: async () => {
    try {
      // const user = await AuthManager.getAuthUser();
      // set({ user });
    } catch (e) {
      Logger.error("useAuthStore", "Error setting logged user", [e]);
    }
  },
}));

export default useAuthStore;
