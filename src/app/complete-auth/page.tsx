import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Constants, FirebaseCollections } from "@/utils/Constants";
import FirestoreService from "@/app/backend/services/FirestoreService";
import { UserRole } from "@/app/backend/business/auth/UsersData";
import Logger from "@/utils/Logger";
import { IRouteParams } from "@/utils/interfaces";

export default async function page({ params: { courseId } }: IRouteParams) {
  const session = await auth();
  const user = session?.user;

  if (!user?.email) {
    Logger.error("CompleteAuthPage", "User not found in session", [user]);
    redirect(`${Constants.APP_ROUTES.CHECKOUT}?error=auth`);
  }

  const storedUser = await FirestoreService.getDocumentById(FirebaseCollections.USERS, user.email);

  if (!storedUser) {
    await FirestoreService.saveDocument(
      FirebaseCollections.USERS,
      {
        email: user.email,
        role: UserRole.USER,
      },
      user.email,
    );

    if (courseId) {
      redirect(Constants.APP_ROUTES.CHECKOUT(courseId));
    } else {
      redirect(Constants.APP_ROUTES.COURSES);
    }
  } else {
    const doesUserHaveSubscription = await FirestoreService.getDocumentById(
      FirebaseCollections.SUBSCRIPTIONS,
      user.email,
    );

    if (doesUserHaveSubscription) {
      return redirect(Constants.APP_ROUTES.COURSES);
    }

    if (courseId) {
      redirect(Constants.APP_ROUTES.CHECKOUT(courseId));
    } else {
      redirect(Constants.APP_ROUTES.COURSES);
    }
  }
}
