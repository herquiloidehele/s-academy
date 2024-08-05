import { create } from "zustand";
import { ITutor } from "@/app/backend/business/auth/UsersData";
import getAuthUser from "@/app/backend/actions/auth";
import { getTutorByUserId } from "@/app/backend/actions/users";
import Logger from "@/utils/Logger";

interface TutorState {
  loggedTutor: ITutor;
  setLoggedTutor: () => void;
}

const useTutorStore = create<TutorState>((set) => ({
  loggedTutor: {} as ITutor,
  setLoggedTutor: async () => {
    try {
      const authUser = await getAuthUser();
      if ("email" in authUser) {
        const tutor = await getTutorByUserId(authUser.email);
        Logger.debug("useTutorStore", "Setting logged tutor", [tutor]);
        set({ loggedTutor: tutor });
      }
    } catch (e) {
      Logger.error("useTutorStore", "Error setting logged tutor", [e]);
      set({ loggedTutor: {} as ITutor });
    }
  },
}));

export default useTutorStore;
