import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { KeyedMutator } from "swr";

// common-component
import Button from "@src/components/common/Button";

// type
import { CommentsResponse } from "./CommentContainer";

// hook
import useMe from "@src/hooks/useMe";

type CommentForm = {
  comment: string;
};

type Props = {
  postIdx: number;
  addComment: (body: any) => void;
  addCommentLoading: boolean;
  commentsMutate: KeyedMutator<CommentsResponse[]>;
};

const CommentForm = ({
  postIdx,
  addComment,
  addCommentLoading,
  commentsMutate,
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
      if (body.comment.length === 0)
        return toast.error("댓글을 입력하고 제출해주세요!");
      if (addCommentLoading)
        return toast.error(
          "댓글을 생성하는 중입니다.\n잠시후에 다시 시도해주세요!"
        );

      addComment({ contents: body.comment });

      commentsMutate(
        (prev) =>
          prev && [
            {
              ok: true,
              comments: [
                {
                  idx: Date.now(),
                  contents: body.comment,
                  postIdx: postIdx,
                  createdAt: new Date(Date.now()),
                  updatedAt: new Date(Date.now()),
                  user: me!,
                  commentIdx: undefined,
                },
              ],
            },
            ...prev,
          ],
        false
      );
    },
    [addCommentLoading, addComment, commentsMutate, postIdx, me]
  );

  return (
    <section className="space-y-4">
      <span className="font-semibold">{"n"}개의 댓글</span>
      <form className="space-y-4" onSubmit={handleSubmit(onAddComment)}>
        <textarea
          placeholder="댓글을 작성하세요"
          {...rest}
          className="w-full p-4 focus:outline-none resize-none rounded-sm bg-zinc-200 dark:bg-zinc-600"
          onInput={handleResizeHeight}
          ref={(e) => {
            ref(e);
            commentRef.current = e;
          }}
        />
        <Button
          type="submit"
          className="block ml-auto font-semibold bg-indigo-400 text-white dark:bg-indigo-500 py-2 px-4 rounded-md"
          contents="댓글 작성"
          loading={addCommentLoading}
        />
      </form>
    </section>
  );
};

export default CommentForm;
