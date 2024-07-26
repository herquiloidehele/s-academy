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
    COURSE_DETAILS_PUBLIC: (courseId: string) => `/course/${courseId}`,
    COMPLETE_TUTOR_SIGNUP: "/complete-tutor-signup",
    COURSE_DETAILS: (courseId: string) => `/courses/${courseId}`,
    LESSON: (courseId: string, moduleId: string, lessonId: string) => `/courses/${courseId}/${moduleId}/${lessonId}`,
    TUTOR_DASHBOARD: "/tutor",
  },
  COURSE: {
    DEFAULT_COURSE_ID: "Q0us6qiWzX00sF2IZyQL",
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

export const PHONE_PREFIX = "258";
