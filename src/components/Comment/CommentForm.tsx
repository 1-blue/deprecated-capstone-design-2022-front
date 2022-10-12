import React, { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

// component
import Button from "@src/components/common/Tool/Button";

// util
import { combineClassNames } from "@src/libs";

type CommentForm = {
  contents: string;
};

type Props = {
  createComment: (contents: string) => void;
  createReply: (contents: string, commentIdx: number) => void;
  commentIdx?: number;
};

const CommentForm = ({ createComment, createReply, commentIdx }: Props) => {
  const { status } = useSession();

  // 2022/04/30 - 댓글 입력 관련 메서드들 - by 1-blue
  const { handleSubmit, register, reset } = useForm<CommentForm>();
  // 2022/04/30 - comment Ref - by 1-blue
  const { ref, ...rest } = register("contents");
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  // 2022/04/30 - textarea 자동 높이 조절 - by 1-blue
  const handleResizeHeight = useCallback(() => {
    if (!commentRef.current) return;

    commentRef.current.style.height = "auto";
    commentRef.current.style.height = commentRef.current?.scrollHeight + "px";
  }, [commentRef]);

  // 2022/09/24 - 댓글 or 답글 생성 - by 1-blue
  const onCreate = useCallback(
    ({ contents }: CommentForm) => {
      if (commentIdx) {
        createReply(contents, commentIdx);
      } else {
        createComment(contents);
      }

      reset();
    },
    [commentIdx, createReply, createComment, reset]
  );

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onCreate)}>
      <textarea
        placeholder={
          status === "authenticated"
            ? "댓글을 작성하세요"
            : "로그인 후에 댓글을 입력할 수 있습니다."
        }
        {...rest}
        className={combineClassNames(
          "w-full p-4 focus:outline-none resize-none rounded-sm bg-zinc-200 dark:bg-zinc-600",
          status === "authenticated" ? "" : "cursor-not-allowed"
        )}
        onInput={handleResizeHeight}
        ref={(e) => {
          ref(e);
          commentRef.current = e;
        }}
        disabled={status !== "authenticated"}
      />
      <Button
        type="submit"
        className={combineClassNames(
          "block ml-auto font-semibold bg-indigo-400 text-white dark:bg-indigo-500 py-2 px-4 rounded-md",
          status === "authenticated" ? "" : "cursor-not-allowed"
        )}
        contents="댓글 작성"
      />
    </form>
  );
};

export default React.memo(CommentForm);
