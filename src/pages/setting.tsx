import type { NextPage } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// common-component
import Avatar from "@src/components/common/Avatar";
import HeadInfo from "@src/components/common/HeadInfo";
import Modal from "@src/components/common/Modal";
import Spinner from "@src/components/common/Spinner";

// hook
import useMe from "@src/hooks/useMe";
import useModal from "@src/hooks/useModal";
import useMutation from "@src/hooks/useMutation";
import useToastMessage from "@src/hooks/useToastMessage";

// type
import type { ResponseOfPhoto } from "@src/types";

type ModifyForm = {
  name: string;
  introduction: string;
};
type ResponseOfModifyProfile = {
  ok: boolean;
};
type ResponseOfRemoveProfile = {
  ok: boolean;
};

const Setting: NextPage = () => {
  const { me, meMutate } = useMe();

  // 2022/05/14 - 이미지 input ref - by 1-blue
  const photoRef = useRef<HTMLInputElement>(null);
  // 2022/05/14 - 이미지 업로드 로딩 변수 - by 1-blue
  const [uploadLoading, setUploadLoading] = useState(false);
  // 2022/05/14 - 아바타 업로드 ( 파일 탐색기 이용 ) - by 1-blue
  const onUploadAvatar = useCallback(
    async (e: any) => {
      setUploadLoading(true);

      try {
        const formData = new FormData();
        formData.append("photo", e.target.files[0]);
        const { photoUrl }: ResponseOfPhoto = await fetch("/api/photo", {
          method: "POST",
          body: formData,
        }).then((res) => res.json());

        await fetch("/api/user", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            avatar: photoUrl,
          }),
        }).then((res) => res.json());

        meMutate(
          (prev) =>
            prev && {
              ...prev,
              user: {
                ...prev.user,
                avatar: photoUrl,
              },
            },
          false
        );

        toast.success("아바타를 업로드했습니다.");
      } catch (error) {
        toast.error("아바타 업로드에 실패했습니다.");
      }

      setUploadLoading(false);
    },
    [setUploadLoading, meMutate]
  );
  // 2022/05/14 - 아바타 제거 - by 1-blue
  const onRemoveAvatar = useCallback(async () => {
    try {
      setUploadLoading(true);

      await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: null,
        }),
      }).then((res) => res.json());

      meMutate(
        (prev) =>
          prev && {
            ...prev,
            user: {
              ...prev.user,
              avatar: null,
            },
          },
        false
      );

      setUploadLoading(false);

      toast.success("아바타를 제거했습니다.");
    } catch (error) {
      toast.error("아바타 제거에 실패했습니다.");
    }
  }, [setUploadLoading, meMutate]);

  // 2022/05/14 - 프로필 수정 처리 관련 메서드들 - by 1-blue
  const [
    profileModifyMutation,
    { loading: modifyLoading, data: responseOfModifyProfile },
    profileModifyResetState,
  ] = useMutation<ResponseOfModifyProfile>({
    url: "/api/user",
    method: "PATCH",
  });
  // 2022/05/14 - 프로필 수정 폼 toggle - by 1-blue
  const [toggleModifyForm, setToggleModifyForm] = useState(false);
  // 2022/05/14 - 프로필 수정 폼 관련 메서드들 - by 1-blue
  const { register, handleSubmit, getValues, setValue } = useForm<ModifyForm>();
  // 2022/05/14 - 프로필 기본 값 입력 - by 1-blue
  useEffect(() => {
    if (me?.name) setValue("name", me.name);
    if (me?.introduction) setValue("introduction", me.introduction);
  }, [me, setValue]);
  // 2022/05/14 - 프로필 수정 - by 1-blub
  const onModifyProfile = useCallback(
    (body: ModifyForm) => profileModifyMutation(body),
    [profileModifyMutation]
  );
  // 2022/05/14 - 프로필 수정 성공 시 실행할 함수 - by 1-blue
  const onModifySuccessed = useCallback(() => {
    meMutate(
      (prev) =>
        prev && {
          ...prev,
          user: {
            ...prev.user,
            ...getValues(),
          },
        },
      false
    );
    setToggleModifyForm(false);
    profileModifyResetState();
  }, [meMutate, setToggleModifyForm, profileModifyResetState, getValues]);
  // 2022/05/14 - 프로실 수정 성공 시 토스트 메시지 - by 1-blue
  useToastMessage({
    ok: responseOfModifyProfile?.ok,
    message: "프로필을 수정했습니다.",
    excute: onModifySuccessed,
  });

  // 2022/05/14 - 계정 삭제 관련 메서드들 - by 1-blue
  const [
    profileRemoveMutation,
    { loading: removeLoading, data: responseOfRemoveProfile },
  ] = useMutation<ResponseOfRemoveProfile>({
    url: "/api/user",
    method: "DELETE",
  });
  // 2022/05/14 - 회원 탈퇴 - by 1-blue
  const onRemoveAccount = useCallback(
    () => profileRemoveMutation({}),
    [profileRemoveMutation]
  );
  // 2022/05/14 - 회원 탈퇴 성공 시 토스트 메시지 - by 1-blue
  useToastMessage({
    ok: responseOfRemoveProfile?.ok,
    message: "계정을 삭제했습니다.",
    go: "/",
  });

  // 2022/05/14 - 계정 삭제 모달 관련 변수들 - by 1-blue
  const [modalRef, isOpen, setIsOpen] = useModal();

  return (
    <>
      <HeadInfo title="설정" description="회원 정보 수정 페이지" />

      <article className="md:mx-auto md:w-3/5 flex flex-col items-center divide-y space-y-8 md:items-stretch md:flex-row md:divide-y-0 md:divide-x mb-20 md:space-y-0 md:space-x-8">
        <form className="flex flex-col space-y-4">
          <Avatar
            photo={me?.avatar}
            size="w-28 h-28"
            $rouneded
            $cover
            $priority
          />
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
              <input
                type="text"
                placeholder="한 줄 소개를 입력해주세요."
                className="p-2 rounded-md bg-gray-200 dark:bg-gray-800"
                {...register("introduction")}
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
              <h2 className="text-3xl font-bold">{me?.name}</h2>
              <span className="block">{me?.introduction}</span>
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
                onClick={onRemoveAccount}
              >
                확인
              </button>
            </div>
          </div>
        </Modal>
      )}

      {(uploadLoading || modifyLoading || removeLoading) && (
        <Spinner kinds="page" />
      )}
    </>
  );
};

export default Setting;
