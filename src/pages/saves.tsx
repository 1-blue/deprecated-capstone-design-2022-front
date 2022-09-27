import { useCallback, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { toast } from "react-toastify";

// api
import apiService from "@src/api";

// util
import { timeFormat } from "@src/libs/dateFormat";

// hook
import useModal from "@src/hooks/useModal";

// component
import HeadInfo from "@src/components/common/HeadInfo";
import Modal from "@src/components/common/Modal";
import Spinner from "@src/components/common/Spinner";

// type
import type { NextPage } from "next";
import type { ApiGetPostsOfTemporaryResponse } from "@src/types";
import { AxiosError } from "axios";

const Saves: NextPage = () => {
  // 2022/05/12 - 임시 게시글 삭제 모달 관련 변수들 - by 1-blue
  const [modalRef, isOpen, setIsOpen] = useModal();
  // 2022/05/12 - 삭제할 임시 게시글의 식별자 - by 1-blue
  const [postIdx, setPostIdx] = useState(-1);
  // 2022/05/12 - 현재 임시 게시글 삭제 요청 여부 - by 1-blue
  const [deleting, setDeleting] = useState(false);

  // 2022/09/26 - 임시 목록 - by 1-blue
  const { data: responsePosts, mutate: postsMutate } =
    useSWR<ApiGetPostsOfTemporaryResponse>(`/api/posts/temporary`);

  // 2022/09/26 - 임시 게시글 삭제 - by 1-blue
  const onClickRemove = useCallback(async () => {
    setDeleting(true);

    try {
      const {
        data: { message },
      } = await apiService.postService.apiDeleteTemporaryPost({ postIdx });

      postsMutate(
        (prev) =>
          prev && {
            ...prev,
            posts: prev.posts.filter((post) => post.idx !== postIdx),
          },
        false
      );

      toast.success(message);
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("서버 문제가 발생했습니다. \n잠시후에 다시 시도해주세요");
      }
    }

    setDeleting(false);
  }, [postsMutate, postIdx, setDeleting]);

  return (
    <>
      <HeadInfo
        title="JSlog | 임시 저장 게시글"
        description="Jslog의 임시 저장 게시글 목록 페이지입니다."
      />

      <h1 className="text-center font-bold text-4xl mb-16">임시 글 목록</h1>

      <ul className="md:mx-auto md:w-3/5 space-y-4 divide-y">
        {responsePosts?.posts?.map((post) => (
          <li key={post.idx} className="pt-4">
            <Link href={`/write?title=${post.title}`}>
              <a className="space-y-4">
                <h3 className="text-2xl font-bold">{post.title}</h3>
                <p className="text-gray-300 paragraph">{post.contents}</p>
              </a>
            </Link>
            <div className="flex justify-between mt-4">
              <time className="block text-sm text-gray-400">
                {timeFormat(post.updatedAt)}
              </time>
              <button
                type="button"
                className="text-sm hover:underline"
                onClick={() => {
                  setIsOpen(true);
                  setPostIdx(post.idx);
                }}
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isOpen && (
        <Modal ref={modalRef} primary noScroll>
          <div className="w-[400px] p-6 rounded-sm space-y-4 bg-zinc-200 dark:bg-zinc-800">
            <h4 className="text-xl font-bold">임시 게시글 삭제</h4>
            <p className="whitespace-pre text-sm text-gray-600 dark:text-gray-300">
              {
                "임시 저장한 게시글을 삭제하시겠습니까?\n삭제한 게시글은 복구할 수 없습니다."
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
                onClick={onClickRemove}
              >
                확인
              </button>
            </div>
          </div>
        </Modal>
      )}

      {deleting && <Spinner kinds="page" />}
    </>
  );
};

export default Saves;
