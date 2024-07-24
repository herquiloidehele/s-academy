interface IAwaitFetchProps<T> {
  promise: Promise<T>;
  children: (value: T) => JSX.Element;
}
export default async function AwaitFetch(props: IAwaitFetchProps<any>) {
  const result = await props.promise;

  return props.children(result);
}
