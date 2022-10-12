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
    <button
      type="button"
      className="flex items-center bg-gray-300 px-3 py-2 rounded-md space-x-1"
      onClick={onClickLikeButton}
    >
      <div className={isLiked ? "text-red-500" : "text-gray-500"}>
        {isLiked ? (
          <Icon
            icon={ICON.HEART}
            $fill
            className="w-6 h-6 animate-heart-beat"
          />
        ) : (
          <Icon icon={ICON.HEART} className="w-6 h-6" />
        )}
      </div>
      <span className="font-semibold text-gray-500">{favorites.length}</span>
    </button>
  );
};

export default Favorite;
