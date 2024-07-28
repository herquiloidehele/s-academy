import { SignupType } from "@/utils/interfaces";

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
  AUTH_ATTRIBUTES: {
    SINGNUP_TYPE: "authType",
    COURSE_ID: "courseId",
  },
  ACTIONS: {
    LOGIN: "LOGIN",
  },
  APP_ROUTES: {
    HOME: "/",
    CHECKOUT: (courseId: string) => `/checkout/${courseId}`,
    COMPLETE_AUTH: (authType: SignupType, courseId: string) =>
      `/complete-auth/?authType=${authType}${courseId ? `&courseId=${courseId}` : ""}`,
    COURSES: "/courses",
    COURSES_LIST: "/#courseSection",
    COURSE_DETAILS_PUBLIC: (courseId: string) => `/course/${courseId}`,
    COMPLETE_TUTOR_SIGNUP: "/complete-tutor-signup",
    COURSE_DETAILS: (courseId: string) => `/courses/${courseId}`,
    LESSON: (courseId: string, moduleId: string, lessonId: string) => `/courses/${courseId}/${moduleId}/${lessonId}`,
    TEACHER: {
      HOME: "/teacher/summary",
      PRODUCTS: "/teacher/products",
      COURSES: "/teacher/products/courses",
      NEW_COURSES: "/teacher/products/courses/form",
      EBOOKS: "/teacher/products/ebooks",
      COURSE: (courseId: string) => `/teacher/courses/${courseId}`,
      MODULE: (courseId: string, moduleId: string) => `/teacher/courses/${courseId}/${moduleId}`,
      LESSON: (courseId: string, moduleId: string, lessonId: string) =>
        `/teacher/courses/${courseId}/${moduleId}/${lessonId}`,
      WALLET: {
        HOME: "/teacher/wallet",
        WITHDRAW: "/teacher/wallet/withdraw",
        HISTORY: "/teacher/wallet/history",
        BALANCE: "/teacher/wallet/balance",
      },
    },
  },
};

export const PROTECTED_ROUTES = [Constants.APP_ROUTES.COURSES];

export enum FirebaseCollections {
  TUTORS = "tutors",
  STUDENTS = "students",
  WITHDRAWALS = "withdrawals",
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
  ADMIN = "admin",
  TUTOR = "tutor",
  STUDENT = "student",
}
export const PHONE_PREFIX = "258";

export abstract class RegexPatterns {
  public static M_PESA_PHONE_NUMBER = /^(84|85)[0-9]{7}$/;
  public static PHONE_NUMBER = /^(82|83|84|85|86|87)[0-9]{7}$/;
}

export enum CourseCardType {
  DEFAULT = "DEFAULT",
  MY_COURSES = "MY_COURSES",
}
