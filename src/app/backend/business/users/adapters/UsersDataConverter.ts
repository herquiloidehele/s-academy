import { ITutorSignupForm } from "@/components/tutor-complete-signup/FormSchema";
import { ITutor } from "@/app/backend/business/auth/UsersData";
import FirestoreService from "@/app/backend/services/FirestoreService";
import { FirebaseCollections } from "@/utils/Constants";

class UsersDataConverter {
  public async convertFormToTutor(formData: ITutorSignupForm): Promise<ITutor> {
    const userReference = await FirestoreService.getDocumentRefById(FirebaseCollections.USERS, formData.userId);

    return {
      id: formData.id,
      name: formData.name,
      userRef: userReference,
      description: formData.description,
      phone: formData.phoneNumber,
      isRegistrationComplete: formData.isRegistrationComplete,
    };
  }
}

export default new UsersDataConverter();
