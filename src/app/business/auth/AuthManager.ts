import Logger from "@/utils/Logger";
import { auth } from "@/auth";
import FirestoreService from "@/app/services/FirestoreService";
import { FirebaseCollections } from "@/utils/Constants";
import { IUser } from "@/app/business/auth/UsersData";

class AuthManager {
  private authUser: IUser | undefined;
  private readonly LOG_TAG = "AuthManager";

  public async getAuthUser(): Promise<IUser | undefined> {
    Logger.info(this.LOG_TAG, "Getting auth user");

    if (this.authUser) {
      Logger.info(this.LOG_TAG, "Get user from local data", [this.authUser]);
      return this.authUser;
    }

    try {
      const session = await auth();
      const user = session?.user;

      if (!user) {
        Logger.error(this.LOG_TAG, "User not found");
        return;
      }

      Logger.info(this.LOG_TAG, "User found", [user]);

      const authUser = await FirestoreService.getDocumentById(FirebaseCollections.USERS, user?.email);
      this.authUser = authUser as IUser;

      Logger.info(this.LOG_TAG, "Auth user found", [authUser]);
      return authUser as IUser;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error getting auth user", [error]);
    }
  }
}

export default new AuthManager();