import { combineClassNames } from "@src/libs/util";
import { forwardRef } from "react";

type Props = {
  children: React.ReactChild;
  className?: string;
};

// eslint-disable-next-line react/display-name
const Modal = forwardRef<HTMLElement, Props>(({ children, className }, ref) => {
  return (
    <aside
      className={combineClassNames(
        "absolute bg-zinc-200 dark:bg-zinc-700 z-10",
        className ? className : ""
      )}
      ref={ref}
    >
      {children}
    </aside>
  );
});

export default Modal;
