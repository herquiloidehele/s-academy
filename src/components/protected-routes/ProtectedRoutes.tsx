import getAuthUser from "@/app/backend/actions/auth";
import { Constants, USER_ROLES } from "@/utils/Constants";
import { redirect } from "next/navigation";

interface ProtectedRoutesProps {
  children: React.ReactNode;
  allowedRoles: USER_ROLES[];
}
export default async function ProtectedRoutes(props: ProtectedRoutesProps) {
  const authUser = await getAuthUser();

  if (!props.allowedRoles.includes(authUser?.role!)) {
    return redirect(Constants.APP_ROUTES.HOME);
  }

  return <>{props.children}</>;
}
