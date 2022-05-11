import { useCallback, useEffect } from "react";

// util
import { throttleHelper } from "@src/libs/util";

type Props = {
  condition: boolean;
  setSize: (size: number | ((_size: number) => number)) => any;
};

// 2022/05/06 - useSWRInfinite() + 무한 스크롤링을 적용하는 훅 - by 1-blue
const useInfiniteScroll = ({ condition, setSize }: Props) => {
  // 2022/05/06 - 인피니티 스크롤링 함수 - by 1-blue
  const infiniteScrollEvent = useCallback(() => {
    if (!condition) return;
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 400
    ) {
      setSize((prev) => prev + 1);
    }
  }, [condition, setSize]);

  // 2022/05/11 - 인피니티 스크롤링에 스토틀링 적용 - by 1-blue
  const throttleInfiniteScrollEvent = throttleHelper(infiniteScrollEvent, 50);

  // 2022/05/06 - 무한 스크롤링 이벤트 등록/해제 - by 1-blue
  useEffect(() => {
    window.addEventListener("scroll", throttleInfiniteScrollEvent);

    return () =>
      window.removeEventListener("scroll", throttleInfiniteScrollEvent);
  }, [throttleInfiniteScrollEvent]);
};

export default useInfiniteScroll;
