import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// type
import { ICON, ResponseStatus } from "@src/types";

// common-component
import Button from "@src/components/common/Button";
import Input from "@src/components/common/Input";
import Spinner from "@src/components/common/Spinner";

// hook
import useMe from "@src/hooks/useMe";
import useMutation from "@src/hooks/useMutation";
import useToastMessage from "@src/hooks/useToastMessage";
import Photo from "@src/components/common/Photo";
import Icon from "@src/components/common/Icon";

export type RegisterForm = {
  id: string;
  password: string;
  passwordCheck: string;
  name: string;
  introduction?: string;
  avatar?: string;
};
type RegisterResponse = {
  status: ResponseStatus;
};
type AvatarResponse = {
  status: ResponseStatus;
  data: {
    photoUrl: string;
  };
};

const Register = () => {
  const router = useRouter();
  const { me } = useMe();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<RegisterForm>();
  const [registerMutation, { data, loading }] = useMutation<RegisterResponse>({
    url: "/api/auth/register",
    method: "POST",
  });

  // 2022/06/04 - textarea 관련 변수/함수들 - by 1-blue
  const introductionRef = useRef<HTMLTextAreaElement | null>(null);
  const handleResizeHeight = useCallback(() => {
    if (!introductionRef.current) return;

    introductionRef.current.style.height = "auto";
    introductionRef.current.style.height =
      introductionRef.current.scrollHeight + "px";
  }, [introductionRef]);
  const { ref, ...rest } = register("introduction");

  // 2022/06/04 - 아바타 input ref - by 1-blue
  const avatarRef = useRef<HTMLInputElement>(null);
  // 2022/06/04 - 아바타 드래그중인지 판단할 변수 - by 1-blue
  const [isDragging, setIsDragging] = useState(false);
  // 2022/06/04 - 아바타 업로드 로딩 변수 - by 1-blue
  const [uploadLoading, setUploadLoading] = useState(false);
  // 2022/06/04 - 아바타 업로드 ( 드래그 앤 드랍 ) - by 1-blue
  const onUploadAvatarByDrop = useCallback(
    async (e: any) => {
      e.preventDefault();

      setUploadLoading(true);

      try {
        const formData = new FormData();
        formData.append("photo", e.dataTransfer.files[0]);
        const {
          data: { photoUrl },
        }: AvatarResponse = await fetch(
          process.env.NEXT_PUBLIC_SERVER_URL + "/api/photo",
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => res.json());
        setValue("avatar", photoUrl);
        toast.success("아바타를 업로드했습니다.");
      } catch (error) {
        toast.error("아바타 업로드에 실패했습니다.");
      }

      setUploadLoading(false);
      setIsDragging(false);
    },
    [setValue, setUploadLoading, setIsDragging]
  );
  // 2022/06/04 - 아바타 업로드 ( 파일 탐색기 이용 ) - by 1-blue
  const onUploadAvatarByExplorer = useCallback(
    async (e: any) => {
      setUploadLoading(true);

      try {
        const formData = new FormData();
        formData.append("photo", e.target.files[0]);
        const {
          data: { photoUrl },
        }: AvatarResponse = await fetch(
          process.env.NEXT_PUBLIC_SERVER_URL + "/api/photo",
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => res.json());
        setValue("avatar", photoUrl);
        toast.success("아바타를 업로드했습니다.");
      } catch (error) {
        toast.error("아바타 업로드에 실패했습니다.");
      }

      setUploadLoading(false);
      setIsDragging(false);
    },
    [setUploadLoading, setValue, setIsDragging]
  );

  // 2022/06/04 - 회원가입 요청 - by 1-blue
  const onSubmit = useCallback(
    (body: RegisterForm) => registerMutation(body),
    [registerMutation]
  );

  // 2022/06/04 - 회원가입 요청 - by 1-blue
  useToastMessage({
    message: "회원가입에 성공했습니다!\n메인 페이지로 이동합니다.",
    go: "/",
    ok: data?.status.ok,
  });

  // 2022/06/04 - 회원가입한 이후에 접근 - by 1-blue
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
            required: "아이디를 입력해주세요!",
          })}
          errorMessage={errors.id?.message}
        />
        <Input
          name="password"
          type="password"
          register={register("password", {
            required: "비밀번호를 입력해주세요!",
          })}
          errorMessage={errors.password?.message}
        />
        <Input
          name="passwordCheck"
          type="password"
          register={register("passwordCheck", {
            validate: (value) =>
              watch("password") === value || "비밀번호가 불일치합니다.",
          })}
          errorMessage={errors.passwordCheck?.message}
        />
        <Input
          name="name"
          type="text"
          register={register("name", {
            required: "이름을 입력해주세요!",
          })}
          errorMessage={errors.name?.message}
        />

        {/* 자기소개 */}
        <label htmlFor="introduction">introduction</label>
        <textarea
          ref={(e) => {
            ref(e);
            introductionRef.current = e;
          }}
          onInput={handleResizeHeight}
          rows={1}
          className="py-2 px-4 mb-4 resize-none focus:outline-none bg-slate-300 dark:bg-slate-600 rounded-sm"
          {...rest}
        />

        {/* 아바타 */}
        <label
          id="photo"
          className="flex justify-center items-center w-full h-80 p-1 border-2 border-dashed border-gray-400 text-gray-400 hover:border-indigo-500 hover:text-indigo-500 cursor-pointer rounded-md"
          onDragOver={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
        >
          {isDragging ? (
            // 이미지 드래그중일 때 랜더링
            <div
              className="flex flex-col h-full justify-center items-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={onUploadAvatarByDrop}
            >
              <span>🖼️이미지를 여기에 드래그 해주세요!</span>
              <Icon icon={ICON.PHOTO} className="w-40 h-40" />
            </div>
          ) : (
            <>
              {watch("avatar") ? (
                <figure className="relative w-full h-full bg-black rounded-md">
                  <Photo
                    photo={watch("avatar")}
                    alt="프로필 사진"
                    $cover
                    size="w-full h-full"
                  />
                </figure>
              ) : (
                <Icon icon={ICON.PHOTO} className="w-20 h-20" />
              )}
              <input
                type="file"
                hidden
                accept="image/*"
                ref={avatarRef}
                onChange={onUploadAvatarByExplorer}
              />
            </>
          )}
        </label>

        <Button
          type="submit"
          contents="회원가입"
          className="bg-indigo-400 py-2 font-bold text-xl mt-4"
          loading={loading}
          loadingText="회원가입중입니다... "
        />
      </form>

      {loading && <Spinner kinds="page" />}
      {uploadLoading && <Spinner kinds="page" />}
    </>
  );
};

export default Register;
