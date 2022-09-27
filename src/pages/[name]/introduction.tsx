import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

// api
import apiService from "@src/api";

// hook
import useMutation from "@src/hooks/useMutation";

// component
import ProfileNav from "@src/components/ProfileNav";
import Button from "@src/components/common/Tool/Button";

// type
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import type { ApiGetUserResponse } from "@src/types";
import { toast } from "react-toastify";

type Props = {
  user: ApiGetUserResponse["user"];
};
type IntroductionForm = {
  introduction: string;
};

const Introduction: NextPage<Props> = ({ user }) => {
  const { status, data } = useSession();

  // 2022/05/17 - 소개글 수정 관련 메서드들 - by 1-blue
  const { register, handleSubmit } = useForm<IntroductionForm>({
    defaultValues: {
      introduction: user.introduction || "",
    },
  });
  // 2022/05/17 - 소개글 수정 토글 - by 1-blue
  const [toggleIntroduction, setToggleIntroduction] = useState(false);

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

  // 2022/05/17 - 자기 소개 수정 요청 - by 1-blue
  const onSubmit = useCallback(
    (body: IntroductionForm) => {
      apiService.userService
        .apiUpdateUser({ userIdx: user.idx, ...body })
        .then(({ data: { message } }) => {
          toast.success(message);

          handleResizeHeight();
          setToggleIntroduction(false);
        })
        .catch((error) => console.error(error));
    },
    [user, handleResizeHeight]
  );

  // 2022/09/26 - 최초 크기 지정 - by 1-blue
  useEffect(() => handleResizeHeight, [handleResizeHeight]);

  return (
    <>
      <ProfileNav
        avatar={user.photo}
        name={user.name}
        introduction={user.introduction}
      />

      <form
        className="md:mx-auto md:w-3/5 mt-8 flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {status === "authenticated" && data.user.idx === user.idx && (
          <>
            {toggleIntroduction && (
              <Button
                type="submit"
                contents="저장하기"
                className="self-end px-4 py-2 rounded-md font-semibold text-white bg-indigo-400 hover:bg-indigo-500"
              />
            )}
            {!toggleIntroduction && (
              <Button
                type="button"
                contents="수정하기"
                className="self-end px-4 py-2 rounded-md font-semibold text-white bg-indigo-400 hover:bg-indigo-500"
                onClick={() => {
                  setToggleIntroduction((prev) => !prev);
                  setTimeout(() => introductionRef.current?.focus(), 0);
                }}
              />
            )}
          </>
        )}

        <textarea
          disabled={!toggleIntroduction}
          {...rest}
          className="resize-none p-4 rounded-md"
          ref={(e) => {
            ref(e);
            introductionRef.current = e;
          }}
          onInput={handleResizeHeight}
        />
      </form>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (!context.params) return { props: { user: null } };
  if (typeof context.params.name !== "string") return { props: { user: null } };

  try {
    const {
      data: { user },
    } = await apiService.userService.apiGetUser({
      name: context.params.name,
    });

    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  } catch (error) {
    console.error("/category/index.tsx getServerSideProps >> ", error);
  }

  return { props: { user: null } };
};

export default Introduction;
