import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Constants, FirebaseCollections } from "@/utils/Constants";
import FirestoreService from "@/app/backend/services/FirestoreService";
import Logger from "@/utils/Logger";
import { IRouteParams, SignupType } from "@/utils/interfaces";
import AuthManager from "@/app/backend/business/auth/AuthManager";
import { IUser } from "@/app/backend/business/auth/UsersData";

const LOG_TAG = "CompleteAuthPage";

export default async function page({ searchParams: { courseId, authType } }: IRouteParams) {
  const session = await auth();
  const user = session?.user;

  if (!user?.email) {
    Logger.error(LOG_TAG, "User not found in session", [user]);
    return redirect(Constants.APP_ROUTES.HOME);
  }

  const storedUser = await FirestoreService.getDocumentById<IUser>(FirebaseCollections.USERS, user.email);

  Logger.info(LOG_TAG, `User found in session: ${user.email}`, [storedUser]);

  if (!storedUser) {
    const finalRedirect = await AuthManager.finalizeUserRegistration(
      user.email,
      AuthManager.SIGNUP_TO_USER_ROLE_MAP[authType as SignupType],
      courseId,
    );

    Logger.info(LOG_TAG, `Redirecting to: ${finalRedirect}`);

    redirect(finalRedirect);
  } else {
    const finalRedirect = await AuthManager.finalizeUserLogin(user.email, storedUser.role, courseId);
    Logger.info(LOG_TAG, `Redirecting to: ${finalRedirect}`);
    return redirect(finalRedirect);
  }
}
