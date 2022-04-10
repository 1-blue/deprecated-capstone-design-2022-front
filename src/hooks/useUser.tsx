import { useEffect } from "react";
import useSWR from "swr";

// type
import { ApiResponseOfMe } from "@src/types";

// 2022/04/08 - 로그인한 유저 정보 - by 1-blue
const useUser = () => {
  const { data, error } = useSWR<ApiResponseOfMe>("/api/users/me");

  useEffect(() => {
    if (!data?.ok) return;

    console.log("비로그인 상태 by useUser");
  }, [data]);

  return { user: data?.user, isLoading: !data && !error };
};

export default useUser;
