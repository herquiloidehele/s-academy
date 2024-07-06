import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Constants, FirebaseCollections } from "@/utils/Constants";
import FirestoreService from "@/app/services/FirestoreService";
import { UserRole } from "@/app/business/auth/UsersData";
import Logger from "@/utils/Logger";

export default async function page() {
  const session = await auth();
  const user = session?.user;

  if (!user?.email) {
    Logger.error("CompleteAuthPage", "User not found in session", [user]);
    redirect(`${Constants.APP_ROUTES.CHECKOUT}?error=auth`);
  }

  const storedUser = await FirestoreService.getDocumentById(FirebaseCollections.USERS, user.email);

  if (!storedUser) {
    await FirestoreService.saveDocument(FirebaseCollections.USERS, user.email, {
      email: user.email,
      role: UserRole.USER,
    });

    redirect(Constants.APP_ROUTES.CHECKOUT);
  } else {
    const doesUserHaveSubscription = await FirestoreService.getDocumentById(
      FirebaseCollections.SUBSCRIPTIONS,
      user.email,
    );
    if (doesUserHaveSubscription) {
      redirect(Constants.APP_ROUTES.COURSE);
    }

    redirect(Constants.APP_ROUTES.CHECKOUT);
  }
}
