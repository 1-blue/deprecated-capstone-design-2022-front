import { forwardRef, useEffect } from "react";

// util
import { combineClassNames } from "@src/libs/util";

type Props = {
  children: React.ReactChild;
  className?: string;
  noScroll?: boolean;
  primary?: boolean;
};

// eslint-disable-next-line react/display-name
const Modal = forwardRef<HTMLElement, Props>(
  ({ children, className, noScroll, primary }, ref) => {
    // 2022/05/01 - 모달창 open 시 스크롤 금지 - by 1-blue
    useEffect(() => {
      if (!noScroll) return;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "auto";
      };
    }, [noScroll]);

    return (
      <aside
        className={combineClassNames(
          "z-10",
          primary
            ? "fixed -top-4 left-0 bottom-0 right-0 z-10 bg-black/80 flex justify-center items-center"
            : "",
          className ? className : ""
        )}
        ref={ref}
      >
        {children}
      </aside>
    );
  }
);

export default Modal;
