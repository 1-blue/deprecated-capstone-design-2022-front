import { useCallback } from "react";
import { useRouter } from "next/router";
import type { KeyedMutator } from "swr";

// common-component
import Photo from "@src/components/common/Photo";

// comment-component
import { CommentsResponse, ICommentWithUser } from "./CommentContainer";

// hooks
import useMe from "@src/hooks/useMe";

// util
import { timeFormat } from "@src/libs/dateFormat";

type Props = {
  comment: ICommentWithUser;
  commentsMutate: KeyedMutator<CommentsResponse[]>;
};

const Comment = ({ comment, commentsMutate }: Props) => {
  const router = useRouter();
  const { me } = useMe();

  // 2022/05/02 - 댓글 삭제 - by 1-blue
  const onRemoveComment = useCallback(
    (commentIdx: number) => async () => {
      await fetch(`/api/post/${router.query.title}/comment/${commentIdx}`, {
        method: "DELETE",
      });

      commentsMutate(
        (prev) =>
          prev &&
          prev.map(({ comments }) => ({
            ok: true,
            comments: comments.filter((comment) => comment.idx !== commentIdx),
          })),
        false
      );
    },
    [router, commentsMutate]
  );

  return (
    <li className="space-y-4 pt-4">
      {/* 아바타, 이름, 작성시간, 삭제 버튼 */}
      <div className="flex space-x-2">
        <Photo
          photo={comment.user.avatar}
          size="w-14 h-14"
          alt="유저 이미지"
          $rouneded
        />
        <div className="flex flex-col">
          <span className="font-semibold">{comment.user.name}</span>
          <time className="text-sm dark:text-gray-400">
            {timeFormat(comment.updatedAt)}
          </time>
        </div>
        <div className="flex-1" />
        {comment.user.id === me?.id && (
          <button
            type="button"
            className="self-start text-gray-400 hover:text-white"
            onClick={onRemoveComment(comment.idx)}
          >
            삭제
          </button>
        )}
      </div>

      {/* 내용 */}
      <p className="whitespace-pre-line">{comment.contents}</p>

      {/* 답글 */}
      <div></div>
    </li>
  );
};

export default Comment;
