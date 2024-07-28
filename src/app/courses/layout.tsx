import ProtectedRoutes from "@/components/protected-routes/ProtectedRoutes";
import { USER_ROLES } from "@/utils/Constants";

export default function layout({ children }) {
  return <ProtectedRoutes allowedRoles={[USER_ROLES.STUDENT]}>{children}</ProtectedRoutes>;
}
