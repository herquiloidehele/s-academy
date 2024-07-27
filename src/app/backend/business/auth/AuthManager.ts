import Logger from "@/utils/Logger";
import { auth } from "@/auth";
import FirestoreService from "@/app/backend/services/FirestoreService";
import { Constants, FirebaseCollections } from "@/utils/Constants";
import { IUser, UserRole } from "@/app/backend/business/auth/UsersData";
import { SignupType } from "@/utils/interfaces";
import UsersManager from "@/app/backend/business/users/UsersManager";

class AuthManager {
  public readonly SIGNUP_TO_USER_ROLE_MAP = {
    [SignupType.GENERAL_LOGIN]: UserRole.STUDENT,
    [SignupType.TUTOR_SIGN_UP]: UserRole.TUTOR,
  };
  private readonly LOG_TAG = "AuthManager";

  public async finalizeUserRegistration(email: string, userRole: UserRole, courseId?: string) {
    try {
      Logger.debug(this.LOG_TAG, `Finalizing auth user: ${email}`);

      await this.createUserAccount(email, userRole);
      const authUser = await FirestoreService.getDocumentById<IUser>(FirebaseCollections.USERS, email);

      if (!authUser) {
        Logger.error(this.LOG_TAG, "User not created yet", [authUser]);
        throw new Error("User not created yet");
      }

      switch (authUser.role) {
        case UserRole.TUTOR: {
          return await this.completeTutorAuth(email);
        }
        case UserRole.STUDENT: {
          if (courseId) {
            return Constants.APP_ROUTES.CHECKOUT(courseId);
          } else {
            return Constants.APP_ROUTES.COURSES;
          }
        }
        default: {
          Logger.error(this.LOG_TAG, "User role not found", [authUser]);
          return Constants.APP_ROUTES.HOME;
        }
      }
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error finalizing signup", [error]);
      return Constants.APP_ROUTES.HOME;
    }
  }

  public async finalizeUserLogin(email: string, role: UserRole, courseId?: string) {
    Logger.debug(this.LOG_TAG, `Finalizing user login`, [email, role]);

    try {
      switch (role) {
        case UserRole.TUTOR: {
          return await this.completeTutorAuth(email);
        }
        case UserRole.STUDENT: {
          const doesUserHaveSubscription = await FirestoreService.getDocumentById(
            FirebaseCollections.SUBSCRIPTIONS,
            email,
          );

          if (doesUserHaveSubscription) {
            return Constants.APP_ROUTES.COURSES;
          }

          if (courseId) {
            return Constants.APP_ROUTES.CHECKOUT(courseId);
          } else {
            return Constants.APP_ROUTES.COURSES;
          }
        }
        default: {
          Logger.error(this.LOG_TAG, "User role not found", [role]);
          return Constants.APP_ROUTES.HOME;
        }
      }
    } catch (error: any) {
      Logger.error(this.LOG_TAG, "Error finalizing login", [error.message, error]);
      return Constants.APP_ROUTES.HOME;
    }
  }

  public async getAuthUser(): Promise<IUser | undefined> {
    Logger.debug(this.LOG_TAG, "Getting auth user");

    try {
      const session = await auth();
      const user = session?.user;

      if (!user) {
        Logger.error(this.LOG_TAG, "User not found");
        return;
      }

      Logger.debug(this.LOG_TAG, "User found", [user]);

      const authUser = await FirestoreService.getDocumentById(FirebaseCollections.USERS, user?.email);

      Logger.debug(this.LOG_TAG, "Auth user found", [authUser]);
      return authUser as IUser;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error getting auth user", [error]);
    }
  }

  private async completeTutorAuth(email: string) {
    Logger.debug(this.LOG_TAG, `Completing tutor auth`, [email]);

    const tutor = await UsersManager.getTutorByUserId(email);

    Logger.debug(this.LOG_TAG, "Tutor found", [tutor]);

    if (!tutor || !tutor.isRegistrationComplete) {
      Logger.error(this.LOG_TAG, "Tutor not found", [tutor]);
      return Constants.APP_ROUTES.COMPLETE_TUTOR_SIGNUP;
    }

    return Constants.APP_ROUTES.TEACHER.HOME;
  }

  private async createUserAccount(email: string, role: UserRole) {
    await FirestoreService.saveDocument(
      FirebaseCollections.USERS,
      {
        email: email,
        role: role,
      },
      email,
    );
  }
}

export default new AuthManager();
