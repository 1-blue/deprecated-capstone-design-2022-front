// type
import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  name: string;
  type: "text" | "password";
  register: UseFormRegisterReturn;
  placeholder?: string;
  infoMessage?: string;
};

const Input = ({ name, type, register, placeholder, infoMessage }: Props) => {
  return (
    <>
      <label htmlFor={name} className="cursor-pointer">
        {name}
      </label>

      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...register}
        className="px-4 py-2 font-bold sm:text-lg focus:outline-none bg-slate-300 dark:bg-slate-600 rounded-sm placeholder:text-xs sm:placeholder:text-sm"
      />

      <span className="text-red-600 mb-4 mt-1 font-semibold text-sm">
        {infoMessage}
      </span>
    </>
  );
};

export default Input;
