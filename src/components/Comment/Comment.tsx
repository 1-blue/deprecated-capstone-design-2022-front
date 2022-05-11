import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import type { KeyedMutator } from "swr";

// common-component
import Photo from "@src/components/common/Photo";

// component
import Recomment from "./Recomment";
import CommentForm from "./CommentForm";

// type
import type { ICommentWithUser } from "@src/types";
import type { ResponseOfComments } from "./CommentContainer";

// hooks
import useMe from "@src/hooks/useMe";

// util
import { timeFormat } from "@src/libs/dateFormat";

type Props = {
  postIdx: number;
  comment: ICommentWithUser;
  commentsMutate: KeyedMutator<ResponseOfComments[]>;
  addComment: (body: any) => void;
  addCommentLoading: boolean;
};

const Comment = ({
  postIdx,
  comment,
  commentsMutate,
  addComment,
  addCommentLoading,
}: Props) => {
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

  // 2022/05/05 - 답글 더 보기 토글 - by 1-blue
  const [toggleRecomment, setToggleRecomment] = useState(false);
  // 2022/05/05 - 답글 삭제 - by 1-blue
  const onRemoveRecomment = useCallback(
    (recommentIdx: number) => async () => {
      await fetch(`/api/post/${router.query.title}/comment/${recommentIdx}`, {
        method: "DELETE",
      });

      commentsMutate(
        (prev) =>
          prev &&
          prev.map(({ comments }) => ({
            ok: true,
            comments: comments.map((comment) => {
              if (!comment.recomments) return comment;

              return {
                ...comment,
                recomments: comment.recomments.filter(
                  (recomment) => recomment.idx !== recommentIdx
                ),
              };
            }),
          })),
        false
      );
    },
    [router, commentsMutate]
  );

  return (
    <li className="space-y-4 py-6">
      {/* 아바타, 이름, 작성시간, 삭제 버튼 */}
      <div className="flex space-x-2">
        <Photo
          photo={comment.user.avatar}
          size="w-12 h-12"
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
        {comment.user.idx === me?.idx && (
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
      <p className="whitespace-pre-line p-4 rounded-md bg-zinc-200 dark:bg-zinc-700">
        {comment.contents}
      </p>

      {/* 답글/답글폼 토글 버튼 */}
      <button type="button" onClick={() => setToggleRecomment((prev) => !prev)}>
        {comment.recomments
          ? "답글 더 보기"
          : toggleRecomment
          ? "숨기기"
          : "답글 달기"}
      </button>

      {/* 답글 */}
      {toggleRecomment && (
        <ul className="pl-8">
          {comment.recomments?.map((recomment) => (
            <Recomment
              key={recomment.idx}
              recomment={recomment}
              onRemoveRecomment={onRemoveRecomment}
            />
          ))}
          <li key={-1} className="pt-4">
            <CommentForm
              postIdx={postIdx}
              addComment={addComment}
              addCommentLoading={addCommentLoading}
              commentsMutate={commentsMutate}
              commentIdx={comment.idx}
            />
          </li>
        </ul>
      )}
    </li>
  );
};

export default Comment;
