import { useEffect } from "react";
import useSWR from "swr";

// type
import type { ResponseStatus, User } from "@src/types";

type ResponseOfMe = {
  status: ResponseStatus;
  data: {
    user: User;
  } | null;
};

// 2022/04/08 - 로그인한 유저 정보 - by 1-blue
const useMe = () => {
  const { data, error, mutate } = useSWR<ResponseOfMe>("/api/user/me");

  useEffect(() => {
    if (!data?.status?.ok) return;

    console.log("비로그인 상태 by useMe");
  }, [data]);

  return { me: data?.data?.user, isLoading: !data && !error, meMutate: mutate };
};

export default useMe;
