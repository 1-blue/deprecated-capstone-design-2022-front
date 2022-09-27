import type { NextPage } from "next";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signOut, useSession } from "next-auth/react";

// api
import apiService from "@src/api";

// hook
import useModal from "@src/hooks/useModal";
import usePhoto from "@src/hooks/usePhoto";

// common-component
import Avatar from "@src/components/common/Avatar";
import HeadInfo from "@src/components/common/HeadInfo";
import Modal from "@src/components/common/Modal";
import Spinner from "@src/components/common/Spinner";
import NotFoundPage from "@src/pages/404";

type ModifyForm = {
  name: string;
  introduction: string;
};

const Setting: NextPage = () => {
  const { data, status } = useSession();

  // 2022/05/14 - 이미지 input ref - by 1-blue
  const photoRef = useRef<HTMLInputElement>(null);
  // 2022/05/14 - 이미지 업로드 로딩 변수 - by 1-blue
  const [uploadLoading, setUploadLoading] = useState(false);

  // 2022/09/25 - 유저 이미지 업로드 함수 - by 1-blue
  const [onUploadPhotoByClick] = usePhoto({ kinds: "user" });

  // 2022/09/27 - 아바타 업로드 ( 파일 탐색기 이용 ) - by 1-blue
  const onUploadAvatar = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (status !== "authenticated")
        return toast.error("로그인후에 접근해주세요!");

      setUploadLoading(true);

      const photoURL = await onUploadPhotoByClick(e);

      if (photoURL) {
        // 유저 이미지 변경
        const {
          data: { message },
        } = await apiService.userService.apiUpdateUser({
          photo: photoURL,
          userIdx: data?.user.idx,
        });

        toast.success(message);
      }

      setUploadLoading(false);
    },
    [status, data, setUploadLoading, onUploadPhotoByClick]
  );
  // 2022/09/27 - 아바타 제거 - by 1-blue
  const onRemoveAvatar = useCallback(async () => {
    if (status !== "authenticated")
      return toast.error("로그인후에 접근해주세요!");

    setUploadLoading(true);

    // 이미지 제거 요청
    const {
      data: { message },
    } = await apiService.userService.apiUpdateUser({
      photo: "remove",
      userIdx: data?.user.idx,
    });

    toast.success(message);

    setUploadLoading(false);
  }, [status, data, setUploadLoading]);

  // 2022/05/14 - 프로필 수정 폼 toggle - by 1-blue
  const [toggleModifyForm, setToggleModifyForm] = useState(false);
  // 2022/05/14 - 프로필 수정 폼 관련 메서드들 - by 1-blue
  const { register, handleSubmit, setValue } = useForm<ModifyForm>();
  // 2022/09/27 - 프로필 기본 값 입력 - by 1-blue
  useEffect(() => {
    if (status !== "authenticated") return;

    setValue("name", data.user.name);
    setValue("introduction", data.user.introduction || "");
  }, [status, data, setValue]);

  // 2022/05/14 - 프로필 수정 - by 1-blub
  const onModifyProfile = useCallback(
    (body: ModifyForm) => {
      if (status !== "authenticated")
        return toast.error("로그인후에 접근해주세요!");

      apiService.userService
        .apiUpdateUser({
          userIdx: data.user.idx,
          ...body,
        })
        .then(({ data: { message } }) => {
          toast.success(message);

          signOut({ redirect: true, callbackUrl: "/login" });
        })
        .catch(console.error);
    },
    [status, data]
  );

  // 2022/09/27 - 회원 탈퇴 - by 1-blue
  const onDeleteAccount = useCallback(() => {
    apiService.userService
      .apiDeleteUser()
      .then(({ data: { message } }) => {
        toast.success(message);

        signOut({ redirect: true, callbackUrl: "/" });
      })
      .catch(console.error);
  }, []);

  // 2022/05/14 - 계정 삭제 모달 관련 변수들 - by 1-blue
  const [modalRef, isOpen, setIsOpen] = useModal();

  // 2022/05/17 - input ref 분리 - by 1-blue
  const introductionRef = useRef<HTMLTextAreaElement | null>(null);
  const { ref, ...rest } = register("introduction");

  // 2022/09/26 - textarea 리사이징 - by 1-blue
  const handleResizeHeight = useCallback(() => {
    if (!introductionRef.current) return;

    introductionRef.current.style.height = "auto";
    introductionRef.current.style.height =
      introductionRef.current?.scrollHeight + 4 + "px";
  }, []);

  if (status !== "authenticated")
    return <NotFoundPage text="로그인후에 접근해주세요!" />;

  return (
    <>
      <HeadInfo title="설정" description="회원 정보 수정 페이지" />

      <article className="md:mx-auto md:w-3/5 flex flex-col items-center divide-y space-y-8 md:items-stretch md:flex-row md:divide-y-0 md:divide-x mb-20 md:space-y-0 md:space-x-8">
        <form className="flex flex-col space-y-4">
          <Avatar photo={data.user.photo} className="w-28 h-28" />
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={onUploadAvatar}
            ref={photoRef}
          />
          <button
            type="button"
            className="py-1 px-4 rounded-md bg-indigo-400 hover:bg-indigo-500 text-white font-semibold"
            onClick={() => photoRef.current?.click()}
          >
            이미지 업로드
          </button>
          <button
            type="button"
            className="py-1 px-4 rounded-md text-indigo-400 hover:bg-gray-200 dark:hover:bg-gray-800 font-semibold"
            onClick={onRemoveAvatar}
          >
            이미지 제거
          </button>
        </form>
        <section className="pt-8 md:pt-0 md:pl-8 space-y-4 flex-1 w-full ">
          {toggleModifyForm ? (
            <form
              onSubmit={handleSubmit(onModifyProfile)}
              className="flex flex-col space-y-4 max-w-[600px]"
            >
              <input
                type="text"
                placeholder="이름을 입력해주세요."
                className="p-2 rounded-md font-bold text-lg bg-gray-200 dark:bg-gray-800"
                {...register("name")}
              />
              <textarea
                {...rest}
                placeholder="한 줄 소개를 입력해주세요."
                className="resize-none p-2 rounded-md bg-gray-200 dark:bg-gray-800"
                ref={(e) => {
                  ref(e);
                  introductionRef.current = e;
                }}
                onInput={handleResizeHeight}
              />
              <div className="self-end space-x-2">
                <button
                  type="button"
                  className="py-1 px-4 rounded-md text-indigo-400 hover:bg-gray-200 dark:hover:bg-gray-800 font-semibold"
                  onClick={() => setToggleModifyForm(false)}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="py-1 px-4 rounded-md bg-indigo-400 hover:bg-indigo-500 text-white font-semibold"
                >
                  저장
                </button>
              </div>
            </form>
          ) : (
            <>
              <h2 className="text-3xl font-bold">{data.user.name}</h2>
              <p className="whitespace-pre-line">{data.user.introduction}</p>
              <button
                type="button"
                className="text-indigo-400 hover:underline"
                onClick={() => setToggleModifyForm(true)}
              >
                수정
              </button>
            </>
          )}
        </section>
      </article>

      <article className="md:mx-auto md:w-3/5 space-y-4">
        <section className="flex items-center">
          <h4 className="text-xl font-bold mr-14">회원탈퇴</h4>
          <button
            type="button"
            className="py-1 px-4 rounded-md text-white dark:text-black font-semibold bg-red-200 hover:bg-red-300"
            onClick={() => setIsOpen(true)}
          >
            회원탈퇴
          </button>
        </section>
        <span className="block text-sm text-gray-400">
          탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.
        </span>
      </article>

      {isOpen && (
        <Modal ref={modalRef} primary noScroll>
          <div className="w-[400px] p-6 rounded-sm space-y-4 bg-zinc-200 dark:bg-zinc-800">
            <h4 className="text-xl font-bold">계정 삭제</h4>
            <p className="whitespace-pre text-sm text-gray-600 dark:text-gray-300">
              {
                "정말 계정을 삭제하시겠습니까?\n삭제한 계정은 복구할 수 없습니다."
              }
            </p>
            <div className="text-right space-x-4 pt-4">
              <button
                type="button"
                className="py-2 px-4 text-white bg-indigo-400 hover:bg-indigo-500 rounded-lg"
              >
                취소
              </button>
              <button
                type="button"
                className="py-2 px-4 text-white bg-indigo-400 hover:bg-indigo-500 rounded-lg"
                onClick={onDeleteAccount}
              >
                확인
              </button>
            </div>
          </div>
        </Modal>
      )}

      {uploadLoading && <Spinner kinds="page" />}
    </>
  );
};

export default Setting;
