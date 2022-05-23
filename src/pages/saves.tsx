import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useSWRInfinite from "swr/infinite";
import { toast } from "react-toastify";

// type
import type { NextPage } from "next";
import type { ResponseStatus, SimplePost } from "@src/types";

// common-component
import Modal from "@src/components/common/Modal";
import Spinner from "@src/components/common/Spinner";

// hook
import useInfiniteScroll from "@src/hooks/useInfiniteScroll";
import useModal from "@src/hooks/useModal";

// util
import { timeFormat } from "@src/libs/dateFormat";

type ResponseOfTempPosts = {
  status: ResponseStatus;
  data: {
    posts: SimplePost[];
  };
};

const Saves: NextPage = () => {
  // 2022/05/12 - 임시 게시글 삭제 모달 관련 변수들 - by 1-blue
  const [modalRef, isOpen, setIsOpen] = useModal();
  // 2022/05/12 - 삭제할 임시 게시글의 제목 - by 1-blue
  const [title, setTitle] = useState("");
  // 2022/05/12 - 현재 임시 게시글 삭제 요청 여부 - by 1-blue
  const [deleting, setDeleting] = useState(false);

  // 2022/05/12 - 게시글 offset - by 1-blue
  const [offset, setOffset] = useState(6);
  // 2022/05/12 - 게시글 추가 패치 가능 여부 - by 1-blue
  const [hasMorePost, setHasMorePost] = useState(true);
  const {
    data: responseTempPosts,
    setSize,
    mutate: tempPostsMutate,
  } = useSWRInfinite<ResponseOfTempPosts>((pageIndex, previousPageData) => {
    if (
      previousPageData?.data &&
      previousPageData?.data.posts.length !== offset
    ) {
      setHasMorePost(false);
      return null;
    }
    if (previousPageData?.data && !previousPageData?.data.posts.length) {
      setHasMorePost(false);
      return null;
    }
    return `/api/temp?page=${pageIndex}&offset=${offset}`;
  });
  // 2022/05/12 - 게시글 스크롤링 시 패치하는 이벤트 등록 - by 1-blue
  useInfiniteScroll({
    condition: hasMorePost,
    setSize,
  });
  // 2022/05/12 - 실제 게시글 목록을 담을 배열 - by 1-blue
  const [list, setList] = useState<any>([]);
  // 2022/05/12 - 게시글 담기 - by 1-blue
  useEffect(() => {
    setList(
      responseTempPosts?.map(({ data: { posts } }) =>
        posts.map((post) => (
          <li key={post.idx} className="pt-4">
            <Link href={`/write?title=${post.title}`}>
              <a className="space-y-4">
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="whitespace-pre-line text-sm text-gray-400">
                  {post.summary}
                </p>
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
                  setTitle(post.title);
                }}
              >
                삭제
              </button>
            </div>
          </li>
        ))
      )
    );
  }, [responseTempPosts, setIsOpen]);

  // 2022/05/12 - 임시 게시글 삭제 이벤트 - by 1-blue
  const onClickRemove = useCallback(async () => {
    setDeleting(true);
    await fetch(`/api/temp/${title}`, {
      method: "DELETE",
    }).then((res) => res.json());
    setDeleting(false);

    tempPostsMutate(
      (prev) =>
        prev &&
        prev.map((body) => ({
          ...body,
          data: {
            posts: body.data.posts.filter((post) => post.title !== title),
          },
        })),
      false
    );

    toast.success(`"${title}" 게시글을 삭제했습니다.`);
  }, [tempPostsMutate, title, setDeleting]);

  return (
    <>
      <h1 className="text-center font-bold text-4xl mb-16">임시 글 목록</h1>

      <ul className="md:mx-auto md:w-3/5 space-y-4 divide-y">{list}</ul>

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
