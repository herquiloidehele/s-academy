import ProtectedRoutes from "@/components/protected-routes/ProtectedRoutes";
import { Constants, USER_ROLES } from "@/utils/Constants";
import SubscriptionManager from "@/app/backend/business/subscription/SubscriptionManager";
import Logger from "@/utils/Logger";
import { redirect } from "next/navigation";
import AuthManager from "@/app/backend/business/auth/AuthManager";

const LOG_TAG = "CourseLayout";

export default async function layout({ children }) {
  const authUser = await AuthManager.getAuthUser();

  if (!authUser?.email) {
    return redirect(Constants.APP_ROUTES.HOME);
  }

  const hasSubscription = await SubscriptionManager.doesUserHaveActiveSubscription(authUser?.email);

  if (!hasSubscription) {
    Logger.debug(LOG_TAG, `User does not have active subscription`);
    return redirect(Constants.APP_ROUTES.COURSES_LIST);
  }

  return <ProtectedRoutes allowedRoles={[USER_ROLES.STUDENT]}>{children}</ProtectedRoutes>;
}
