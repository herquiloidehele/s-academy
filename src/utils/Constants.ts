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
