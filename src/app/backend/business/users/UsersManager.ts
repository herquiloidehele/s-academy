import { ITutor } from "@/app/backend/business/auth/UsersData";
import Logger from "@/utils/Logger";
import FirestoreService from "@/app/backend/services/FirestoreService";
import { FirebaseCollections } from "@/utils/Constants";
import { ITutorSignupForm } from "@/components/tutor-complete-signup/FormSchema";
import UsersDataConverter from "@/app/backend/business/users/adapters/UsersDataConverter";

class UsersManager {
  private readonly LOG_TAG = "UsersManager";

  public async getTutorByUserId(userId: string): Promise<ITutor | undefined> {
    Logger.debug(this.LOG_TAG, `Getting tutor by user id`, [userId]);

    try {
      const userReference = await FirestoreService.getDocumentRefById(FirebaseCollections.USERS, userId);

      Logger.debug(this.LOG_TAG, `User reference`, [userReference]);

      const tutor = await FirestoreService.getDocumentsByQuery<ITutor>(FirebaseCollections.TUTORS, {
        field: "userRef",
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

  public async createOrUpdateTutor(tutor: ITutorSignupForm): Promise<void> {
    Logger.debug(this.LOG_TAG, `Creating tutor`, [tutor]);

    try {
      const convertedTutor: ITutor = await UsersDataConverter.convertFormToTutor(tutor);

      Logger.debug(this.LOG_TAG, `Converted tutor`, [convertedTutor]);

      const existingTutor = await this.getTutorByUserId(tutor.userId);

      if (existingTutor) {
        await FirestoreService.updateDocument(FirebaseCollections.TUTORS, existingTutor.id!, convertedTutor);
        Logger.info(this.LOG_TAG, `Tutor updated`, [tutor]);
        return;
      }

      await FirestoreService.saveDocument(FirebaseCollections.TUTORS, convertedTutor);
      Logger.info(this.LOG_TAG, `Tutor created`, [tutor]);
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error creating tutor`, [tutor, error]);
      throw error;
    }
  }
}

export default new UsersManager();
