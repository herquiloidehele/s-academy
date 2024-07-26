import { ITutor } from "@/app/backend/business/auth/UsersData";
import Logger from "@/utils/Logger";
import FirestoreService from "@/app/backend/services/FirestoreService";
import { FirebaseCollections } from "@/utils/Constants";

class UsersManager {
  private readonly LOG_TAG = "UsersManager";

  public async getTutorByUserId(userId: string): Promise<ITutor | undefined> {
    Logger.debug(this.LOG_TAG, `Getting tutor by user id`, [userId]);

    try {
      const userReference = await FirestoreService.getDocumentRefById(FirebaseCollections.USERS, userId);
      const tutor = await FirestoreService.getDocumentsByQuery<ITutor>(FirebaseCollections.TUTORS, {
        field: "userId",
        operator: "==",
        value: userReference,
      });

      Logger.info(this.LOG_TAG, `Tutor found by user id`, [userId, tutor]);

      return tutor[0];
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error getting tutor by user id`, [userId, error]);
      return;
    }
  }
}

export default new UsersManager();
