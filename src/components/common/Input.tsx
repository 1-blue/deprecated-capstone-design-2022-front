// type
import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  name: string;
  type: "text" | "password";
  register: UseFormRegisterReturn;
  errorMessage?: string;
};

const Input = ({ name, type, register, errorMessage }: Props) => {
  return (
    <>
      <label htmlFor={name} className="cursor-pointer">
        {name}
      </label>
      <input
        type={type}
        id={name}
        {...register}
        className="px-4 py-2 font-bold text-lg focus:outline-none bg-slate-300 dark:bg-slate-600 rounded-sm"
      />
      <span className="text-red-600 mb-4 mt-1 font-semibold text-sm">
        {errorMessage}
      </span>
    </>
  );
};

export default Input;
