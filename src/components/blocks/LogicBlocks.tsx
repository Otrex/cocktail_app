import type { Any } from "@/lib/types";

export const If = <T,>({
  condition,
  children,
}: {
  condition: T extends false ? never : boolean;
  children: React.ReactNode;
}) => (condition ? children : null);

export const IfElse = ({
  condition,
  children,
  fallback,
  elseChildren,
}: {
  condition: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  elseChildren?: React.ReactNode;
}) => (condition ? children : fallback || elseChildren);

export const IfElseIf = ({
  condition,
  children,
  elseChildren,
}: {
  condition: boolean;
  children: React.ReactNode;
  elseChildren: React.ReactNode;
}) => (condition ? children : elseChildren);

export const For = <T,>({
  each,
  render,
  emptyState,
}: {
  each: T[] | Record<string, T>;
  render: (
    item: T,
    index: number | string,
    objIndex?: number
  ) => React.ReactNode;
  emptyState?: React.ReactNode;
}) => (
  <>
    {Array.isArray(each)
      ? each.map((item, index) => render(item, index))
      : Object.entries(each).map(([key, item], objIndex) =>
          render(item, key, objIndex)
        )}
    {emptyState && Object.entries(each).length === 0 && emptyState}
  </>
);

export const Unless = ({
  condition,
  children,
}: {
  condition: boolean;
  children: React.ReactNode;
}) => (condition ? null : children);

interface GeneralLoaderProps<T = Any> {
  isLoading: boolean;
  isError: boolean;
  data: T;
  render: (data: T) => React.ReactNode;
  hasData?: (data: T) => boolean;
  errorComponent?: React.ReactNode;
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
}

export default function AsyncLoader<T>({
  isLoading,
  isError,
  render,
  data,
  hasData = (data) => !!data,
  errorComponent = <div>Something went wrong</div>,
  loadingComponent = <div>Loading...</div>,
  emptyComponent = <div>No data available</div>,
}: GeneralLoaderProps<T>) {
  if (isLoading) {
    return <>{loadingComponent}</>;
  }

  if (isError) {
    return <>{errorComponent}</>;
  }

  if (!hasData(data)) {
    return <>{emptyComponent}</>;
  }

  return render(data);
}
