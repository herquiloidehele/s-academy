import { SignupType } from "@/utils/interfaces";

const EXTERNAL_CONFIGS = {
  API_REQUEST_TIMEOUT: 60000,
  VIMEO_ACCESS_TOKEN: process.env.NEXT_PUBLIC_VIMEO_ACCESS_TOKEN,
  FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const Constants = {
  EXTERNAL_CONFIGS,
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
      HOME: "/tutor/summary",
      PRODUCTS: "/tutor/products",
      COURSES: "/tutor/products/courses",
      NEW_COURSES: "/tutor/products/courses/form",
      EDIT_COURSES: (courseId: string) => `/tutor/products/courses/form/${courseId}`,
      EBOOKS: "/tutor/products/ebooks",
      COURSE: (courseId: string) => `/teacher/courses/${courseId}`,
      MODULE: (courseId: string, moduleId: string) => `/teacher/courses/${courseId}/${moduleId}`,
      LESSON: (courseId: string, moduleId: string, lessonId: string) =>
        `/teacher/courses/${courseId}/${moduleId}/${lessonId}`,
      WALLET: {
        HOME: "/tutor/wallet",
        WITHDRAW: "/tutor/wallet/withdraw",
        HISTORY: "/tutor/wallet/history",
        BALANCE: "/tutor/wallet/balance",
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
