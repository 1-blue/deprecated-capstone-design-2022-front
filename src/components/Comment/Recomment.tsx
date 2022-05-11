// common-component
import Photo from "@src/components/common/Photo";

// type
import type { IRecommentWithUser } from "@src/types";

// hooks
import useMe from "@src/hooks/useMe";

// util
import { timeFormat } from "@src/libs/dateFormat";

type Props = {
  recomment: IRecommentWithUser;
  onRemoveRecomment: (recommentIdx: number) => () => Promise<void>;
};

const Recomment = ({ recomment, onRemoveRecomment }: Props) => {
  const { me } = useMe();

  return (
    <li className="space-y-4 pt-4">
      {/* 아바타, 이름, 작성시간, 삭제 버튼 */}
      <div className="flex space-x-2">
        <Photo
          photo={recomment.user.avatar}
          size="w-10 h-10"
          alt="유저 이미지"
          $rouneded
        />
        <div className="flex flex-col">
          <span className="font-semibold">{recomment.user.name}</span>
          <time className="text-sm dark:text-gray-400">
            {timeFormat(recomment.updatedAt)}
          </time>
        </div>
        <div className="flex-1" />
        {recomment.user.idx === me?.idx && (
          <button
            type="button"
            className="self-start text-gray-400 hover:text-white"
            onClick={onRemoveRecomment(recomment.idx)}
          >
            삭제
          </button>
        )}
      </div>

      {/* 내용 */}
      <p className="whitespace-pre-line p-4 rounded-md bg-zinc-200 dark:bg-zinc-700">
        {recomment.contents}
      </p>
    </li>
  );
};

export default Recomment;
