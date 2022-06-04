import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import { useForm } from "react-hook-form";
import React, { useCallback, useRef, useState } from "react";

// component
import ProfileNav from "@src/components/ProfileNav";

// common-component
import Button from "@src/components/common/Button";

// type
import type { SimpleUser } from "@src/types";

// hook
import useMutation from "@src/hooks/useMutation";
import useMe from "@src/hooks/useMe";

type Props = {
  user: SimpleUser;
};
type IntroductionForm = {
  introduction: string;
};

const Introduction: NextPage<Props> = ({ user }) => {
  const { me } = useMe();
  // 2022/05/17 - 소개글 수정 관련 메서드들 - by 1-blue
  const { register, handleSubmit } = useForm<IntroductionForm>({
    defaultValues: {
      introduction: user.introduction,
    },
  });
  // 2022/05/17 - 소개글 수정 토글 - by 1-blue
  const [toggleIntroduction, setToggleIntroduction] = useState(false);

  // 2022/05/17 - input ref 분리 - by 1-blue
  const introductionRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register("introduction");

  // 2022/05/17 - 자기 소개 수정 요청관련 메서드 - by 1-blue
  const [updateIntroduction, { loading }] = useMutation({
    url: "/api/user",
    method: "PATCH",
  });
  // 2022/05/17 - 자기 소개 수정 요청 - by 1-blue
  const onSubmit = useCallback(
    (body: IntroductionForm) => {
      updateIntroduction(body);
      setToggleIntroduction((prev) => !prev);
    },
    [updateIntroduction, setToggleIntroduction]
  );

  return (
    <>
      <ProfileNav avatar={user.avatar} name={user.name} />

      <form
        className="md:mx-auto md:w-3/5 mt-8 flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {me?.idx === user.idx && (
          <>
            {toggleIntroduction && (
              <Button
                type="submit"
                contents="저장하기"
                className="self-end px-4 py-2 rounded-md font-semibold text-white bg-indigo-400 hover:bg-indigo-500"
                loading={loading}
                loadingText="수정중..."
              />
            )}
            {!toggleIntroduction && (
              <Button
                type="button"
                contents="수정하기"
                className="self-end px-4 py-2 rounded-md font-semibold text-white bg-indigo-400 hover:bg-indigo-500"
                loading={loading}
                loadingText="수정중..."
                onClick={() => {
                  setToggleIntroduction((prev) => !prev);
                  setTimeout(() => introductionRef.current?.focus(), 0);
                }}
              />
            )}
          </>
        )}

        <input
          type="text"
          disabled={!toggleIntroduction}
          {...rest}
          className="p-4 rounded-md"
          ref={(e) => {
            ref(e);
            introductionRef.current = e;
          }}
        />
      </form>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${context.params?.name}`
  ).then((res) => res.json());

  return {
    props: {
      user: response?.data.user,
    },
  };
};

export default Introduction;
