export interface IRouteParams {
  searchParams: {
    [key: string]: string | undefined;
  };
  params: {
    [key: string]: string | undefined;
  };
}

export interface IErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export interface IComponentErrorProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export enum SignupType {
  TUTOR_SIGN_UP = "tutor-sign-up",
  GENERAL_LOGIN = "general-login",
}
