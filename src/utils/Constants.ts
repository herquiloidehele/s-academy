export const Constants = {
  UI: {
    HEADER_HEIGHT: "80px",
    SECTIONS: {
      HERO: "heroSection",
      COURSE: "courseSection",
      PRICE: "priceSection",
      TESTEMONIALS: "testemonialsSection",
      CALL_TO_ACTION: "callToActionSection",
      FOOTER: "footerSection",
    },
  },
  AUTH_PROVIDER: {
    GOOGLE: "google",
  },
  ACTIONS: {
    LOGIN: "LOGIN",
  },
  APP_ROUTES: {
    HOME: "/",
    CHECKOUT: (courseId: string) => `/checkout/${courseId}`,
    COMPLETE_AUTH: "/complete-auth",
    COURSES: "/courses",
    COURSE_DETAILS: (courseId: string) => `/courses/${courseId}`,
    LESSON: (courseId: string, moduleId: string, lessonId: string) => `/courses/${courseId}/${moduleId}/${lessonId}`,
  },
  COURSE: {
    DEFAULT_COURSE_ID: "Q0us6qiWzX00sF2IZyQL",
  },
};

export const PROTECTED_ROUTES = [Constants.APP_ROUTES.COURSES];

export enum FirebaseCollections {
  USERS = "users",
  SUBSCRIPTIONS = "subscriptions",
  COURSES = "courses",
  MODULES = "modules",
  LESSONS = "lessons",
}

export enum CurrencyCode {
  MZN = "MZN",
  EUR = "EUR",
  USD = "USD",
}

export enum Locales {
  PT = "pt-PT",
  EN = "en",
}

export const PHONE_PREFIX = "258";
