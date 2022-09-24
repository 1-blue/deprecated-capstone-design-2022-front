import { useCallback } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

// util
import { combineClassNames } from "@src/libs";

// compopnent
import Icon from "@src/components/common/Icon";

// type
import { ICON } from "@src/types";

type Props = {
  favorites: { userIdx: number }[];
  onCreateFavorite: () => void;
  onDeleteFavorite: () => void;
};

const Favorite = ({ favorites, onCreateFavorite, onDeleteFavorite }: Props) => {
  const { data, status } = useSession();

  // 2022/09/24 - 본인이 좋아요 눌렀는지 여부 - by 1-blue
  const isLiked = data
    ? favorites.map(({ userIdx }) => userIdx).includes(data.user.idx)
    : false;

  // 2022/05/03 - 좋아요 버튼 클릭 이벤트 - by 1-blue
  const onClickLikeButton = useCallback(() => {
    if (status !== "authenticated")
      return toast.error("로그인 후에 접근이 가능합니다.");

    if (isLiked) onDeleteFavorite();
    else onCreateFavorite();
  }, [status, isLiked, onDeleteFavorite, onCreateFavorite]);

  return (
    <aside className="fixed top-[14%] left-[4%] bg-zinc-200 text-gray-400 py-3 px-2 rounded-full flex flex-col items-center">
      <button
        type="button"
        className={combineClassNames(
          "p-2 border-2 bg-zinc-300 border-gray-400 hover:border-indigo-500 hover:text-indigo-500 rounded-full",
          isLiked
            ? "bg-red-200 border-red-300 text-red-400 hover:bg-red-300 hover:border-red-400 hover:text-red-500"
            : ""
        )}
        onClick={onClickLikeButton}
      >
        {isLiked ? (
          <Icon
            icon={ICON.HEART}
            $fill
            className="w-6 h-6 animate-heart-beat"
          />
        ) : (
          <Icon icon={ICON.HEART} className="w-6 h-6" />
        )}
      </button>
      <span className="font-semibold text-gray-600">{favorites.length}</span>
    </aside>
  );
};

export default Favorite;
