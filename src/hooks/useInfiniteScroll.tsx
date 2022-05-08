import { useCallback, useEffect, useState } from "react";

type Props = {
  condition: boolean;
  setSize: (size: number | ((_size: number) => number)) => any;
};

// 2022/05/06 - useSWRInfinite() + 무한 스크롤링을 적용하는 훅 - by 1-blue
const useInfiniteScroll = ({ condition, setSize }: Props) => {
  // 2022/05/06 - 스로틀링 변수 - by 1-blue
  const [throttle, setThrottle] = useState(false);

  // 2022/05/06 - 인피니티 스크롤링 함수 - by 1-blue
  const infiniteScrollEvent = useCallback(() => {
    if (!condition) return;
    if (throttle) return;
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 400
    ) {
      setThrottle(true);
      setTimeout(() => {
        // 게시글을 패치 완료하고 다시 랜더링되는 사이에 다시 스크롤 이벤트가 발생되는 경우를 배제하기 위함
        setTimeout(() => setThrottle(false), 100);
        setSize((prev) => prev + 1);
      }, 400);
    }
  }, [condition, setSize, throttle, setThrottle]);

  // 2022/05/06 - 무한 스크롤링 이벤트 등록/해제 - by 1-blue
  useEffect(() => {
    window.addEventListener("scroll", infiniteScrollEvent);

    return () => window.removeEventListener("scroll", infiniteScrollEvent);
  }, [infiniteScrollEvent]);
};

export default useInfiniteScroll;
