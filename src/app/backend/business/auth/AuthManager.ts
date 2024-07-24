import Logger from "@/utils/Logger";
import { auth } from "@/auth";
import FirestoreService from "@/app/backend/services/FirestoreService";
import { FirebaseCollections } from "@/utils/Constants";
import { IUser } from "@/app/backend/business/auth/UsersData";

class AuthManager {
  private readonly LOG_TAG = "AuthManager";

  public async getAuthUser(): Promise<IUser | undefined> {
    Logger.info(this.LOG_TAG, "Getting auth user");

    try {
      const session = await auth();
      const user = session?.user;

      if (!user) {
        Logger.error(this.LOG_TAG, "User not found");
        return;
      }

      Logger.info(this.LOG_TAG, "User found", [user]);

      const authUser = (await FirestoreService.getDocumentById(FirebaseCollections.USERS, user?.email)) as IUser;

      Logger.info(this.LOG_TAG, "Auth user found", [authUser]);
      return authUser as IUser;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error getting auth user", [error]);
    }
  }
}

export default new AuthManager();
