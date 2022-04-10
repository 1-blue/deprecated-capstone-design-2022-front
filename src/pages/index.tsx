import type { NextPage } from "next";
import useSWR from "swr";

// type
import { ApiResponseOfPosts } from "@src/types";

// component
import Post from "@src/components/Post";
import MainNav from "@src/components/MainNav";

const Home: NextPage = () => {
  const { data: responsePosts } = useSWR<ApiResponseOfPosts>("/api/posts");

  return (
    <>
      {/* 최신 게시글과 인기 게시글 네비게이터 */}
      <article>
        <MainNav />
      </article>

      {/* 게시글 리스트 */}
      <article>
        <ul className="grid gird-col-1 gap-x-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {responsePosts?.posts.map((post, index) => (
            <Post key={post.id} post={post} $priority={index < 4} />
          ))}
        </ul>
      </article>
    </>
  );
};

export default Home;
