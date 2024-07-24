export const Constants = {
  UI: {
    HEADER_HEIGHT: "80px",
    SECTIONS: {
      HERO: "heroSection",
      COURSES: "courseSection",
      PRICE: "priceSection",
      TESTEMONIALS: "testemonialsSection",
      CALL_TO_ACTION: "callToActionSection",
      FOOTER: "footerSection",
    },
    FALLBACK_IMAGES: { COURSE_ENTRY: "https://dummyimage.com/1460x1460" },
    DATE_FORMATS: {
      DATE_AND_TIME: "D MMM, HH:mm",
      BASE_DATE: "DD MMM YYYY",
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
    COURSE_DETAILS_PUBLIC: (courseId: string) => `/course/${courseId}`,
    TUTOR_SIGNUP: "/tutor-signup",
    COURSE_DETAILS: (courseId: string) => `/courses/${courseId}`,
    LESSON: (courseId: string, moduleId: string, lessonId: string) => `/courses/${courseId}/${moduleId}/${lessonId}`,
    TEACHER:{
      HOME: "/teacher",
      PRODUCTS: "/teacher/products",
      COURSES: "/teacher/products/courses",
      COURSE: (courseId: string) => `/teacher/courses/${courseId}`,
      MODULE: (courseId: string, moduleId: string) => `/teacher/courses/${courseId}/${moduleId}`,
      LESSON: (courseId: string, moduleId: string, lessonId: string) => `/teacher/courses/${courseId}/${moduleId}/${lessonId}`,
      WALLET:{
        HOME: "/teacher/wallet",
        WITHDRAW: "/teacher/wallet/withdraw",
        HISTORY: "/teacher/wallet/history",
        BALANCE: "/teacher/wallet/balance",
      },
    }

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
export enum USER_ROLES {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
}
export const PHONE_PREFIX = "258";
