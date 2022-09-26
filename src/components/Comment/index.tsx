import React, { useState } from "react";
import { useSession } from "next-auth/react";

// util
import { timeFormat } from "@src/libs";

// component
import Avatar from "@src/components/common/Avatar";
import Reply from "@src/components/Comment/Reply";
import CommentForm from "@src/components/Comment/CommentForm";

// type
import type { CommentWithData } from "@src/types";

type Props = {
  comment: CommentWithData;
  createComment: (contents: string) => void;
  deleteComment: (commentIdx: number) => () => void;
  createReply: (contents: string, commentIdx: number) => void;
  deleteReply: (replyIdx: number) => () => void;
};

const Comment = ({
  comment,
  createComment,
  deleteComment,
  createReply,
  deleteReply,
}: Props) => {
  const { data, status } = useSession();

  // 2022/05/05 - 답글 더 보기 토글 - by 1-blue
  const [toggleReply, setToggleReply] = useState(false);

  return (
    <li className="space-y-4 py-6">
      {/* 아바타, 이름, 작성시간, 삭제 버튼 */}
      <div className="flex space-x-2">
        <Avatar
          photo={comment.User.photo}
          className="w-12 h-12"
          alt="유저 이미지"
        />
        <div className="flex flex-col">
          <span className="font-semibold">{comment.User.name}</span>
          <time className="text-sm dark:text-gray-400">
            {timeFormat(comment.updatedAt)}
          </time>
        </div>
        <div className="flex-1" />
        {status === "authenticated" && data.user.idx === comment.User.idx && (
          <button
            type="button"
            className="self-start text-gray-400 hover:text-white"
            onClick={deleteComment(comment.idx)}
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
      <button type="button" onClick={() => setToggleReply((prev) => !prev)}>
        {toggleReply
          ? "숨기기"
          : comment.replys.length !== 0
          ? `답글 ${comment.replys.length}개 더 보기`
          : "답글 달기"}
      </button>

      {/* 답글 */}
      {toggleReply && (
        <ul className="pl-8">
          {comment.replys?.map((reply) => (
            <Reply key={reply.idx} reply={reply} deleteReply={deleteReply} />
          ))}
          <li key={-1} className="pt-4">
            <CommentForm
              createComment={createComment}
              createReply={createReply}
              commentIdx={comment.idx}
            />
          </li>
        </ul>
      )}
    </li>
  );
};

export default React.memo(Comment);
