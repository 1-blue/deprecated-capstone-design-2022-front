import { useState } from "react";
import useSWRInfinite from "swr/infinite";
import { useRouter } from "next/router";

// common-component
import Button from "@src/components/common/Button";

// comment-component
import CommentForm from "./CommentForm";
import Comment from "./Comment";

// type
import type { ICommentWithUser } from "@src/types";

// hook
import useMutation from "@src/hooks/useMutation";

export type ResponseOfComments = {
  ok: boolean;
  comments: ICommentWithUser[];
};

type Props = {
  postIdx: number;
  allCount: number;
};

const CommentContainer = ({ postIdx, allCount }: Props) => {
  const router = useRouter();

  // 2022/05/02 - 보여줄 댓글 개수 - by 1-blue
  const [showCount, setShowCount] = useState(1);

  // 2022/05/02 - 댓글 offset - by 1-blue
  const [offset, setOffset] = useState(10);
  // 2022/05/02 - 댓글 추가 패치 가능 여부 - by 1-blue
  const [hasMoreComment, setHasMoreComment] = useState(true);
  // 2022/05/02 - 댓글들 순차적 요청 - by 1-blue
  const {
    data: commentsResponse,
    size,
    setSize,
    mutate: commentsMutate,
    isValidating: commentsLoading,
  } = useSWRInfinite<ResponseOfComments>(
    router.query.title
      ? (pageIndex, previousPageData) => {
          if (previousPageData && previousPageData.comments.length !== offset) {
            setHasMoreComment(false);
            return null;
          }
          if (previousPageData && !previousPageData.comments.length) {
            setHasMoreComment(false);
            return null;
          }
          return `/api/post/${router.query.title}/comment?page=${pageIndex}&offset=${offset}`;
        }
      : () => null
  );
  // 2022/05/02 - 댓글 추가 관련 메서드 - by 1-blue
  const [addComment, { loading: addCommentLoading }] = useMutation({
    url: router.query.title ? `/api/post/${router.query.title}/comment` : null,
    method: "POST",
  });

  return (
    <>
      <section className="space-y-2">
        <span className="font-semibold">{allCount}개의 댓글</span>
        {/* 댓글 입력 폼 */}
        <CommentForm
          postIdx={postIdx}
          addComment={addComment}
          addCommentLoading={addCommentLoading}
          commentsMutate={commentsMutate}
        />
      </section>

      <section className="divide-y">
        <>
          {/* 댓글들 */}
          {commentsResponse?.map(({ comments }, index) => {
            if (showCount > index)
              return (
                <ul key={index} className="divide-y dark:divide-gray-400">
                  {comments.map((comment) => (
                    <Comment
                      key={comment.idx}
                      postIdx={postIdx}
                      comment={comment}
                      commentsMutate={commentsMutate}
                      addComment={addComment}
                      addCommentLoading={addCommentLoading}
                    />
                  ))}
                </ul>
              );
          })}

          {/* 댓글 더 불러오기 버튼 */}
          {hasMoreComment ? (
            <Button
              type="button"
              className="block mx-auto px-4 py-2 rounded-md font-semibold text-white bg-indigo-400 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              contents="댓글 더 불러오기"
              onClick={() => setShowCount((prev) => prev + 1)}
              onMouseEnter={() => setSize(showCount + 1)}
              loading={commentsLoading && size === showCount}
              loadingText="댓글을 불러오는 중입니다..."
            />
          ) : (
            <span className="block text-center text-xl font-semibold pt-4">
              더 이상 불러올 댓글이 없습니다.
            </span>
          )}
        </>
      </section>
    </>
  );
};

export default CommentContainer;
