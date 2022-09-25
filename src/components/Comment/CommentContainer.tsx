import { useCallback, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

// api
import apiService from "@src/api";

// component
import Button from "@src/components/common/Tool/Button";
import CommentForm from "@src/components/Comment/CommentForm";
import Comment from "@src/components/Comment";

// hook

// type
import type { CommentWithUser, ApiGetCommentsResponse } from "@src/types";
import { AxiosError } from "axios";

type Props = {
  postIdx: number;
  allCount: number;
};

const limit = 10;

const CommentContainer = ({ postIdx, allCount }: Props) => {
  const { data, status } = useSession();

  // 2022/05/02 - 보여줄 댓글 개수 - by 1-blue
  const [showCount, setShowCount] = useState(1);

  // 2022/05/02 - 댓글 추가 패치 가능 여부 - by 1-blue
  const [hasMoreComment, setHasMoreComment] = useState(true);
  // 2022/05/02 - 댓글들 순차적 요청 - by 1-blue
  const {
    data: commentsResponse,
    size,
    setSize,
    mutate: commentsMutate,
    isValidating: commentsLoading,
  } = useSWRInfinite<ApiGetCommentsResponse>((pageIndex, previousPageData) => {
    if (previousPageData && previousPageData.comments.length !== limit) {
      setHasMoreComment(false);
      return null;
    }
    if (previousPageData && previousPageData.comments.length === 0) {
      setHasMoreComment(false);
      return null;
    }

    const lastIdx =
      previousPageData?.comments?.[previousPageData.comments.length - 1].idx ||
      -1;

    return `/api/comments?postIdx=${postIdx}&lastIdx=${lastIdx}&limit=${limit}`;
  });

  // 2022/09/24 - 댓글 추가 요청 - by 1-blue
  const createComment = useCallback(
    async (contents: string) => {
      if (status !== "authenticated")
        return toast.error("로그인후에 접근해주세요!");
      if (contents.trim().length === 0)
        return toast.error("댓글을 입력하고 제출해주세요!");

      try {
        const {
          data: { message },
        } = await apiService.commentService.apiCreateComment({
          postIdx,
          contents,
        });

        toast.success(message);

        const replys = [] as CommentWithUser[];

        commentsMutate(
          (prev) =>
            prev &&
            prev.map(({ comments, message }, index) => {
              if (index !== 0) return { comments, message };

              return {
                comments: [
                  {
                    idx: Date.now(),
                    contents,
                    createdAt: new Date(Date.now()),
                    updatedAt: new Date(Date.now()),
                    User: {
                      idx: data.user.idx,
                      name: data.user.name,
                      photo: data.user.photo,
                    },
                    userIdx: data.user.idx,
                    postIdx: postIdx,
                    commentIdx: null,
                    replys,
                  },
                  ...comments,
                ],
                message,
              };
            }),
          false
        );
      } catch (error) {
        console.error(error);

        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("서버 문제가 발생했습니다. \n잠시후에 다시 시도해주세요");
        }
      }
    },
    [postIdx, data, status, commentsMutate]
  );

  // 2022/09/24 - 댓글 제거 요청 - by 1-blue
  const deleteComment = useCallback(
    (commentIdx: number) => async () => {
      try {
        const {
          data: { message },
        } = await apiService.commentService.apiDeleteComment({ commentIdx });

        toast.success(message);

        commentsMutate(
          (prev) =>
            prev &&
            prev.map(({ comments, message }) => ({
              comments: comments.filter(
                (comment) => comment.idx !== commentIdx
              ),
              message,
            })),
          false
        );
      } catch (error) {
        console.error(error);

        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("서버 문제가 발생했습니다. \n잠시후에 다시 시도해주세요");
        }
      }
    },
    [commentsMutate]
  );

  // 2022/09/24 - 답글 추가 요청 - by 1-blue
  const createReply = useCallback(
    async (contents: string, commentIdx: number) => {
      if (status !== "authenticated")
        return toast.error("로그인후에 접근해주세요!");
      if (contents.trim().length === 0)
        return toast.error("답글을 입력하고 제출해주세요!");

      try {
        const {
          data: { message },
        } = await apiService.replyService.apiCreateReply({
          postIdx,
          commentIdx,
          contents,
        });

        toast.success(message);

        commentsMutate(
          (prev) =>
            prev &&
            prev.map(({ comments, message }) => ({
              message,

              comments: comments.map((comment) => {
                if (comment.idx !== commentIdx) return comment;

                return {
                  ...comment,
                  replys: comment.replys
                    ? [
                        ...comment.replys,
                        {
                          idx: Date.now(),
                          contents,
                          createdAt: new Date(Date.now()),
                          updatedAt: new Date(Date.now()),
                          User: {
                            idx: data.user.idx,
                            name: data.user.name,
                            photo: data.user.photo,
                          },
                          userIdx: data.user.idx,
                          postIdx: postIdx,
                          commentIdx,
                        },
                      ]
                    : [
                        {
                          idx: Date.now(),
                          contents,
                          createdAt: new Date(Date.now()),
                          updatedAt: new Date(Date.now()),
                          User: {
                            idx: data.user.idx,
                            name: data.user.name,
                            photo: data.user.photo,
                          },
                          userIdx: data.user.idx,
                          postIdx: postIdx,
                          commentIdx,
                        },
                      ],
                };
              }),
            })),
          false
        );
      } catch (error) {
        console.error(error);

        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("서버 문제가 발생했습니다. \n잠시후에 다시 시도해주세요");
        }
      }
    },
    [postIdx, data, status, commentsMutate]
  );

  // 2022/09/24 - 답글 제거 요청 - by 1-blue
  const deleteReply = useCallback(
    (replyIdx: number) => async () => {
      try {
        const {
          data: { message },
        } = await apiService.replyService.apiDeleteReply({ replyIdx });

        toast.success(message);

        commentsMutate(
          (prev) =>
            prev &&
            prev.map(({ comments, message }) => ({
              message,
              comments: comments.map((comment) => {
                if (comment.replys.length === 0) return comment;

                return {
                  ...comment,
                  replys: comment.replys.filter(
                    (reply) => reply.idx !== replyIdx
                  ),
                };
              }),
            })),
          false
        );
      } catch (error) {
        console.error(error);

        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("서버 문제가 발생했습니다. \n잠시후에 다시 시도해주세요");
        }
      }
    },
    [commentsMutate]
  );

  return (
    <>
      <section className="space-y-2">
        <span className="font-semibold">{allCount}개의 댓글</span>
        {/* 댓글 입력 폼 */}
        <CommentForm createComment={createComment} createReply={createReply} />
      </section>

      <section className="divide-y">
        {/* 댓글들 */}
        {commentsResponse?.map(({ comments }, index) => {
          if (showCount > index)
            return (
              <ul key={index} className="divide-y dark:divide-gray-400">
                {comments.map((comment) => (
                  <Comment
                    key={comment.idx}
                    comment={comment}
                    createComment={createComment}
                    deleteComment={deleteComment}
                    createReply={createReply}
                    deleteReply={deleteReply}
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
      </section>
    </>
  );
};

export default CommentContainer;
