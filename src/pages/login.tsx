import { useCallback } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// type
import type { ResponseStatus } from "@src/types";

// common-component
import Button from "@src/components/common/Button";
import Input from "@src/components/common/Input";
import Spinner from "@src/components/common/Spinner";

// hook
import useMe from "@src/hooks/useMe";
import useMutation from "@src/hooks/useMutation";
import useToastMessage from "@src/hooks/useToastMessage";

export type LoginForm = {
  id: string;
  password: string;
};
type LoginResponse = {
  status: ResponseStatus;
};

const Login = () => {
  const router = useRouter();
  const { me } = useMe();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const [loginMutation, { data, loading }] = useMutation<LoginResponse>({
    url: "/api/auth/login",
    method: "POST",
  });

  // 2022/06/04 - 로그인 요청 - by 1-blue
  const onSubmit = useCallback(
    (body: LoginForm) => loginMutation(body),
    [loginMutation]
  );

  // 2022/06/04 - 로그인 요청 - by 1-blue
  useToastMessage({
    message: "로그인에 성공했습니다!\n메인 페이지로 이동합니다.",
    go: "/",
    ok: data?.status.ok,
  });

  // 2022/06/04 - 로그인한 이후에 접근 - by 1-blue
  if (me) {
    toast.error("로그아웃하고 접근해주세요!");
    router.push("/");
    return null;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-[500px] mx-auto"
      >
        <Input
          name="id"
          type="text"
          register={register("id", {
            required: "아이디를 입력하세요!",
          })}
          errorMessage={errors.id?.message}
        />
        <Input
          name="password"
          type="password"
          register={register("password", {
            required: "비밀번호를 입력하세요!",
          })}
          errorMessage={errors.password?.message}
        />
        <Button
          type="submit"
          contents="로그인"
          className="bg-indigo-400 py-2 font-bold text-xl mt-4"
          loading={loading}
          loadingText="로그인중입니다... "
        />
      </form>

      {loading && <Spinner kinds="page" />}
    </>
  );
};

export default Login;
