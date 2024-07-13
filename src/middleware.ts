import { Constants, PROTECTED_ROUTES } from "@/utils/Constants";
import { auth } from "@/auth";
import Logger from "@/utils/Logger";

const LOG_TAG = "Middleware";

export default auth((req) => {
  Logger.debug(LOG_TAG, "Checking if user is authenticated", [req.auth]);

  if (!req.auth && PROTECTED_ROUTES.includes(req.nextUrl.pathname)) {
    const newUrl = new URL(Constants.APP_ROUTES.HOME, req.nextUrl.origin);
    return Response.redirect(newUrl, 302);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
