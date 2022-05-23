import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { KeyedMutator } from "swr";

// common-component
import Button from "@src/components/common/Button";

// type
import type { ResponseOfComments } from "./CommentContainer";

// hook
import useMe from "@src/hooks/useMe";

// util
import { combineClassNames } from "@src/libs/util";

type CommentForm = {
  comment: string;
};

type Props = {
  postIdx: number;
  addComment: (body: any) => void;
  addCommentLoading: boolean;
  commentsMutate: KeyedMutator<ResponseOfComments[]>;
  commentIdx?: number;
};

const CommentForm = ({
  postIdx,
  addComment,
  addCommentLoading,
  commentsMutate,
  commentIdx,
}: Props) => {
  const { me } = useMe();

  // 2022/04/30 - 댓글 입력 관련 메서드들 - by 1-blue
  const { handleSubmit, register, reset } = useForm<CommentForm>();
  // 2022/04/30 - comment Ref - by 1-blue
  const { ref, ...rest } = register("comment");
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  // 2022/04/30 - textarea 자동 높이 조절 - by 1-blue
  const handleResizeHeight = useCallback(() => {
    if (!commentRef.current) return;

    commentRef.current.style.height = "auto";
    commentRef.current.style.height = commentRef.current?.scrollHeight + "px";
  }, [commentRef]);

  // 2022/05/02 - 댓글 추가 - by 1-blue
  const onAddComment = useCallback(
    (body: CommentForm) => {
      if (!me) return toast.error("로그인 후에 접근해주세요!");
      if (body.comment.length === 0)
        return toast.error("댓글을 입력하고 제출해주세요!");
      if (addCommentLoading)
        return toast.error(
          "댓글을 생성하는 중입니다.\n잠시후에 다시 시도해주세요!"
        );

      addComment({ contents: body.comment });

      commentsMutate(
        (prev) =>
          prev &&
          prev.map((comments, index) => {
            if (index !== 0) return comments;

            return {
              ...comments,
              comments: [
                {
                  idx: Date.now(),
                  contents: body.comment,
                  postIdx: postIdx,
                  createdAt: new Date(Date.now()),
                  updatedAt: new Date(Date.now()),
                  user: me,
                  commentIdx: undefined,
                },
                ...comments.data.comments,
              ],
            };
          }),
        false
      );

      reset();
    },
    [addCommentLoading, addComment, commentsMutate, postIdx, me, reset]
  );
  // 2022/05/05 - 답글 추가 - by 1-blue
  const onAddRecomment = useCallback(
    (body: CommentForm) => {
      if (!me) return toast.error("로그인 후에 접근해주세요!");
      if (body.comment.length === 0)
        return toast.error("답글을 입력하고 제출해주세요!");
      if (addCommentLoading)
        return toast.error(
          "답글을 생성하는 중입니다.\n잠시후에 다시 시도해주세요!"
        );

      addComment({ contents: body.comment, commentIdx });

      commentsMutate(
        (prev) =>
          prev &&
          prev.map((commentBody) => ({
            ...commentBody,
            comments: commentBody.data.comments.map((comment) => {
              if (comment.idx !== commentIdx) return comment;

              return {
                ...comment,
                recomments: comment.recomments
                  ? [
                      ...comment.recomments,
                      {
                        idx: Date.now(),
                        contents: body.comment,
                        postIdx: postIdx,
                        createdAt: new Date(Date.now()),
                        updatedAt: new Date(Date.now()),
                        user: me,
                        commentIdx: undefined,
                      },
                    ]
                  : [
                      {
                        idx: Date.now(),
                        contents: body.comment,
                        postIdx: postIdx,
                        createdAt: new Date(Date.now()),
                        updatedAt: new Date(Date.now()),
                        user: me,
                        commentIdx: undefined,
                      },
                    ],
              };
            }),
          })),
        false
      );

      reset();
    },
    [
      addCommentLoading,
      addComment,
      commentsMutate,
      postIdx,
      me,
      commentIdx,
      reset,
    ]
  );

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(commentIdx ? onAddRecomment : onAddComment)}
    >
      <textarea
        placeholder={
          !me ? "로그인 후에 댓글을 입력할 수 있습니다." : "댓글을 작성하세요"
        }
        {...rest}
        className={combineClassNames(
          "w-full p-4 focus:outline-none resize-none rounded-sm bg-zinc-200 dark:bg-zinc-600",
          !me ? "cursor-not-allowed" : ""
        )}
        onInput={handleResizeHeight}
        ref={(e) => {
          ref(e);
          commentRef.current = e;
        }}
        disabled={!me}
      />
      <Button
        type="submit"
        className={combineClassNames(
          "block ml-auto font-semibold bg-indigo-400 text-white dark:bg-indigo-500 py-2 px-4 rounded-md",
          !me ? "cursor-not-allowed" : ""
        )}
        contents="댓글 작성"
        loading={addCommentLoading}
        loadingText="댓글 생성중"
      />
    </form>
  );
};

export default CommentForm;
