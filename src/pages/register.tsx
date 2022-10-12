import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// api
import apiService from "@src/api";

// hook
import usePhoto from "@src/hooks/usePhoto";

// component
import HeadInfo from "@src/components/common/HeadInfo";
import Input from "@src/components/common/Tool/Input";
import Textarea from "@src/components/common/Tool/Textarea";
import Button from "@src/components/common/Tool/Button";
import Spinner from "@src/components/common/Spinner";
import Photo from "@src/components/common/Photo";
import Icon from "@src/components/common/Icon";

// type
import type { ChangeEvent, DragEvent } from "react";
import type { ApiSignUpBody } from "@src/types";
import { ICON } from "@src/types";
import { AxiosError } from "axios";

export type RegisterForm = ApiSignUpBody & {
  passwordCheck: string;
};

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<RegisterForm>();

  // 2022/09/23 - 회원가입중인지 판단 - by 1-blue
  const [isSignUp, setIsSignUp] = useState(false);
  // 2022/06/04 - 아바타 input ref - by 1-blue
  const avatarRef = useRef<HTMLInputElement>(null);
  // 2022/06/04 - 아바타 드래그중인지 판단할 변수 - by 1-blue
  const [isDragging, setIsDragging] = useState(false);
  // 2022/06/04 - 아바타 업로드 로딩 변수 - by 1-blue
  const [uploadLoading, setUploadLoading] = useState(false);

  // 2022/09/25 - 유저 이미지 업로드 함수 - by 1-blue
  const [onUploadPhotoByClick, onUploadPhotoByDrop] = usePhoto({
    kinds: "user",
  });

  // 2022/09/25 - 유저 프로필 사진 업로드 ( 파일 탐색기 이용 ) - by 1-blue
  const onUploadAvatarByExplorer = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setUploadLoading(true);

      const photoURL = await onUploadPhotoByClick(e);

      if (photoURL) setValue("photo", photoURL);

      setUploadLoading(false);
      setIsDragging(false);
    },
    [onUploadPhotoByClick, setUploadLoading, setValue, setIsDragging]
  );
  // 2022/09/25 - 유저 프로필 사진 업로드 ( 드래그 앤 드랍 ) - by 1-blue
  const onUploadAvatarByDrop = useCallback(
    async (e: DragEvent<HTMLDivElement>) => {
      setUploadLoading(true);

      const photoURL = await onUploadPhotoByDrop(e);

      if (photoURL) setValue("photo", photoURL);

      setUploadLoading(false);
      setIsDragging(false);
    },
    [onUploadPhotoByDrop, setValue, setUploadLoading, setIsDragging]
  );

  // 2022/09/23 - 회원가입 요청 - by 1-blue
  const onSubmit = useCallback(
    (body: RegisterForm) => {
      setIsSignUp(true);
      const { passwordCheck, ...rest } = body;

      apiService.authService
        .apiSignUp(rest)
        .then(({ data: { message } }) => {
          toast.success(message);
          router.push("/login");
        })
        .catch((error) => {
          console.error("회원가입 >> ", error);

          if (error instanceof AxiosError) {
            toast.error(error.response?.data.message);
          } else {
            toast.error("알 수 없는 에러입니다.");
          }
        })
        .finally(() => {
          setIsSignUp(false);
        });
    },
    [router]
  );

  return (
    <>
      <HeadInfo
        title="Jslog | 회원가입"
        description="Jslog의 회원가입페이지입니다."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-[500px] mx-auto"
      >
        <Input
          name="아이디"
          type="text"
          register={register("id", {
            required: "아이디를 입력해주세요!",
            maxLength: {
              value: 20,
              message: "20자 이내로 입력해주세요!",
            },
          })}
          placeholder="아이디를 입력해주세요."
          infoMessage={errors.id?.message}
        />
        <Input
          name="비밀번호"
          type="password"
          register={register("password", {
            required: "비밀번호를 입력해주세요!",
          })}
          placeholder="비밀번호를 입력해주세요."
          infoMessage={errors.password?.message}
        />
        <Input
          name="비밀번호 확인"
          type="password"
          register={register("passwordCheck", {
            validate: (value) =>
              watch("password") === value || "비밀번호가 불일치합니다.",
          })}
          placeholder="비밀번호를 다시 입력해주세요."
          infoMessage={errors.passwordCheck?.message}
        />
        <Input
          name="이름"
          type="text"
          register={register("name", {
            required: "이름을 입력해주세요!",
            maxLength: {
              value: 20,
              message: "20자 이내로 입력해주세요!",
            },
          })}
          placeholder="사용할 이름을 입력해주세요."
          infoMessage={errors.name?.message}
        />

        {/* 자기소개 */}
        <Textarea
          name="자기소개"
          register={register("introduction", {
            maxLength: {
              value: 100,
              message: "100자 이내로 입력해주세요! ( 공백 포함 )",
            },
          })}
          placeholder="간단한 자기소개를 입력해주세요."
          infoMessage={errors.introduction?.message}
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
              {watch("photo") ? (
                <figure className="relative w-full h-full bg-black rounded-md">
                  <Photo
                    photo={watch("photo")}
                    alt="프로필 사진"
                    $cover
                    className="w-full h-full"
                  />
                </figure>
              ) : (
                <Icon icon={ICON.PHOTO} className="w-16 h-16 sm:w-20 sm:h-20" />
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
          className="bg-indigo-400 py-2 font-bold text-lg sm:text-xl mt-4 text-white hover:bg-indigo-500 transition-all"
          loadingText="회원가입중입니다... "
        />
      </form>

      {isSignUp && <Spinner kinds="page" />}
      {uploadLoading && <Spinner kinds="page" />}
    </>
  );
};

export default Register;
