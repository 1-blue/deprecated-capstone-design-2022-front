import type { NextPage } from "next";
import useSWR from "swr";

// component
import Post from "@src/components/Post";
import NotFoundPage from "@src/pages/404";
import HeadInfo from "@src/components/common/HeadInfo";

// type
import type { ApiGetPostsOfFavoriteResponse } from "@src/types";

const Liked: NextPage = () => {
  const { data } = useSWR<ApiGetPostsOfFavoriteResponse>(
    `/api/posts?kinds=favorite`
  );

  if (!data) return <NotFoundPage text="로그인후에 접근해주세요" />;

  return (
    <>
      <HeadInfo
        title="JSlog | 좋아요 누른 게시글"
        description="Jslog의 좋아요 누른 게시글 페이지입니다."
      />

      <h1 className="mb-4 font-bold text-2xl">좋아요를 누른 게시글들</h1>

      <ul className="grid gird-col-1 gap-x-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {data.posts.map((post, i) => (
          <Post key={post.idx} post={post} priority={i < 4} />
        ))}
      </ul>
    </>
  );
};

export default Liked;
