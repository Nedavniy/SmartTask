import { useEffect, useState } from "react";

type UseFetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useFetch<T>(fetchFn: () => Promise<T>): UseFetchState<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchFn()
      .then(data => {
        setState({ data, loading: false, error: null });
      })
      .catch(error => {
        setState({ data: null, loading: false, error });
        console.error(error);
      });
  }, [fetchFn]);

  return state;
}