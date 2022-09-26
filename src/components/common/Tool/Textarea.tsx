import { useCallback, useRef } from "react";

// type
import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  name: string;
  register: UseFormRegisterReturn;
  placeholder?: string;
  infoMessage?: string;
};

const Textarea = ({ name, register, placeholder, infoMessage }: Props) => {
  // 2022/08/18 - register에서 ref 떼내기 - by 1-blue
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const { ref, ...restRegister } = register;

  // 2022/08/18 - textarea 리사이징 - by 1-blue
  const handleResizeHeight = useCallback(() => {
    if (!textRef.current) return;

    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current?.scrollHeight + 4 + "px";
  }, []);

  return (
    <>
      <label htmlFor={name} className="cursor-pointer">
        {name}
      </label>

      <textarea
        id={name}
        rows={5}
        placeholder={placeholder}
        {...restRegister}
        className="py-2 px-4 resize-none sm:text-lg focus:outline-none bg-slate-300 dark:bg-slate-600 rounded-sm placeholder:text-xs sm:placeholder:text-sm"
        ref={(e) => {
          ref(e);
          textRef.current = e;
        }}
        onInput={handleResizeHeight}
      />

      <span className="text-red-600 mb-4 mt-1 font-semibold text-sm">
        {infoMessage}
      </span>
    </>
  );
};

export default Textarea;
