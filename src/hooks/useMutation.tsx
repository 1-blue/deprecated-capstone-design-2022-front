import { useCallback, useState } from "react";

interface IUseMutationState<T> {
  loading: boolean;
  data: T | null;
  error: any;
}
type UseMutationProps = {
  url?: string | null;
  method?: "POST" | "PUT" | "DELETE" | "PATCH";
};
type UseMutationResponse<T> = [
  (body: any) => void,
  IUseMutationState<T>,
  () => void
];

// 2022/04/27 - 패치함수, 로딩, 결과값, 에러를 반환하는 hook - by 1-blue
export default function useMutation<T>({
  url,
  method = "POST",
}: UseMutationProps): UseMutationResponse<T> {
  const [state, setState] = useState<IUseMutationState<T>>({
    loading: false,
    data: null,
    error: null,
  });

  const mutation = (body: any) => {
    setState((prev) => ({ ...prev, loading: true }));

    if (!url) return;

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  };

  const resetState = useCallback(
    () =>
      setState({
        loading: false,
        data: null,
        error: null,
      }),
    [setState]
  );

  return [mutation, state, resetState];
}
