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
