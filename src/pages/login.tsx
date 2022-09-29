import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

// component
import HeadInfo from "@src/components/common/HeadInfo";
import Button from "@src/components/common/Tool/Button";
import Input from "@src/components/common/Tool/Input";
import Spinner from "@src/components/common/Spinner";

// type
import type { ApiLogInBody } from "@src/types";
import { AxiosError } from "axios";

export type LoginForm = ApiLogInBody;
const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  // 2022/09/23 - 로그인중인지 여부 - by 1-blue
  const [isLogIn, setIsLogIn] = useState(false);

  // 2022/09/23 - 로그인 요청 - by 1-blue
  const onLogIn = useCallback(
    async (body: ApiLogInBody) => {
      setIsLogIn(true);

      try {
        const result = await signIn("credentials", {
          redirect: false,
          ...body,
        });

        if (result?.error) return toast.error(result.error);

        toast.success("로그인 성공. 메인 페이지로 이동합니다.");

        router.push("/");
      } catch (error) {
        console.error(error);

        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("알 수 없는 에러가 발생했습니다.");
        }
      } finally {
        setIsLogIn(false);
      }
    },
    [router]
  );

  return (
    <>
      <HeadInfo
        title="Jslog | 로그인"
        description="Jslog의 로그인페이지입니다."
      />

      <form
        onSubmit={handleSubmit(onLogIn)}
        className="flex flex-col max-w-[500px] mx-auto"
      >
        <Input
          name="id"
          type="text"
          register={register("id", {
            required: "아이디를 입력하세요!",
          })}
          infoMessage={errors.id?.message}
        />
        <Input
          name="password"
          type="password"
          register={register("password", {
            required: "비밀번호를 입력하세요!",
          })}
          infoMessage={errors.password?.message}
        />
        <Button
          type="submit"
          contents="로그인"
          className="bg-indigo-400 py-2 font-bold sm:text-lg mt-4 text-white hover:bg-indigo-500 transition-all"
          loading={isLogIn}
          loadingText="로그인중입니다... "
        />
        <Button
          type="button"
          contents="Kakao"
          className="bg-yellow-400 dark:bg-yellow-400 py-2 font-bold sm:text-lg mt-4 text-white hover:bg-yellow-500 dark:hover:bg-yellow-500 transition-all"
          onClick={() =>
            signIn("kakao", {
              redirect: true,
              callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
            })
          }
        />
      </form>

      {isLogIn && <Spinner kinds="page" />}
    </>
  );
};

export default Login;
