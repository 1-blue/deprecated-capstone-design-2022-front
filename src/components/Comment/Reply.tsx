import React from "react";
import { useSession } from "next-auth/react";

// util
import { timeFormat } from "@src/libs/dateFormat";

// component
import Avatar from "@src/components/common/Avatar";

// type
import type { CommentWithUser } from "@src/types";

type Props = {
  reply: CommentWithUser;
  deleteReply: (replyIdx: number) => () => void;
};

const Reply = ({ reply, deleteReply }: Props) => {
  const { data, status } = useSession();

  return (
    <li className="space-y-4 pt-4">
      {/* 아바타, 이름, 작성시간, 삭제 버튼 */}
      <div className="flex space-x-2">
        <Avatar
          photo={reply.User.photo}
          className="w-10 h-10"
          alt="유저 이미지"
        />
        <div className="flex flex-col">
          <span className="font-semibold">{reply.User.name}</span>
          <time className="text-sm dark:text-gray-400">
            {timeFormat(reply.updatedAt)}
          </time>
        </div>
        <div className="flex-1" />
        {status === "authenticated" && reply.User.idx === data.user.idx && (
          <button
            type="button"
            className="self-start text-gray-400 hover:text-white"
            onClick={deleteReply(reply.idx)}
          >
            삭제
          </button>
        )}
      </div>

      {/* 내용 */}
      <p className="whitespace-pre-line p-4 rounded-md bg-zinc-200 dark:bg-zinc-700">
        {reply.contents}
      </p>
    </li>
  );
};

export default React.memo(Reply);
