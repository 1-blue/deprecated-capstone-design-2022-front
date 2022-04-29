import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

type Props = {
  ok?: boolean;
  message: string;
  go?: string;
  excute?: () => void;
};

// 2022/04/27 - 토스트 메시지 + 페이지 이동 훅 - by 1-blue
const useToastMessage = ({ ok, message, go, excute }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (!ok) return;

    toast.success(message);

    if (excute) excute();
    if (go) router.push(go);
  }, [router, ok, message, excute, go]);

  return null;
};

export default useToastMessage;
