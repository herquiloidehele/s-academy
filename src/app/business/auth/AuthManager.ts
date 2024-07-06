import Logger from "@/utils/Logger";
import { auth } from "@/auth";
import FirestoreService from "@/app/services/FirestoreService";
import { FirebaseCollections } from "@/utils/Constants";
import { User } from "@/app/business/auth/UsersData";

class AuthManager {
  private readonly LOG_TAG = "AuthManager";

  public async getAuthUser(): Promise<User | undefined> {
    Logger.info(this.LOG_TAG, "Getting auth user");

    try {
      const session = await auth();
      const user = session?.user;

      const authUser = await FirestoreService.getDocumentById(FirebaseCollections.USERS, user?.email);

      Logger.info(this.LOG_TAG, "Auth user found", [authUser]);
      return authUser as User;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error getting auth user", [error]);
    }
  }
}

export default new AuthManager();
