export const Constants = {
  UI: {
    HEADER_HEIGHT: "80px",
  },
  AUTH_PROVIDER: {
    GOOGLE: "google",
  },
  ACTIONS: {
    LOGIN: "LOGIN",
  },
  APP_ROUTES: {
    HOME: "/",
    CHECKOUT: "/checkout",
    COMPLETE_AUTH: "/complete-auth",
    COURSE: "/course",
  },
};

export const PROTECTED_ROUTES = [Constants.APP_ROUTES.COURSE];

export enum FirebaseCollections {
  USERS = "users",
  SUBSCRIPTIONS = "subscriptions",
  COURSES = "courses",
  LESSONS = "lessons",
}

export const PHONE_PREFIX = "258";
