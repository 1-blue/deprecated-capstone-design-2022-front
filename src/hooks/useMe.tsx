import { useEffect } from "react";
import useSWR from "swr";

// type
import type { User } from "@src/types";

type ResponseOfMe = {
  ok: boolean;
  user: User;
};

// 2022/04/08 - 로그인한 유저 정보 - by 1-blue
const useMe = () => {
  const { data, error, mutate } = useSWR<ResponseOfMe>("/api/user/me");

  useEffect(() => {
    if (!data?.ok) return;

    console.log("비로그인 상태 by useMe");
  }, [data]);

  return { me: data?.user, isLoading: !data && !error, meMutate: mutate };
};

export default useMe;
