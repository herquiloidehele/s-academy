export interface ISearchParams {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export interface IErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
