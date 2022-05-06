import { useEffect, useState } from "react";
import type { NextPage } from "next";
import useSWRInfinite from "swr/infinite";

// type
import { ApiResponseOfPosts } from "@src/types";

// component
import Post from "@src/components/Post";
import MainNav from "@src/components/MainNav";

// hook
import useInfiniteScroll from "@src/hooks/useInfiniteScroll";

const Home: NextPage = () => {
  // 2022/05/06 - 게시글 offset - by 1-blue
  const [offset, setOffset] = useState(20);
  // 2022/05/06 - 게시글 추가 패치 가능 여부 - by 1-blue
  const [hasMorePost, setHasMorePost] = useState(true);
  // 2022/05/06 - 게시글 패치 관련 데이터 - by 1-blue
  const { data: responsePosts, setSize } = useSWRInfinite<ApiResponseOfPosts>(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.posts.length !== offset) {
        setHasMorePost(false);
        return null;
      }
      if (previousPageData && !previousPageData.posts.length) {
        setHasMorePost(false);
        return null;
      }
      return `/api/posts?page=${pageIndex}&offset=${offset}&kinds=popular`;
    }
  );
  // 2022/05/06 - 게시글 스크롤링 시 패치하는 이벤트 등록 - by 1-blue
  useInfiniteScroll({
    condition: hasMorePost,
    setSize,
  });
  // 2022/05/06 - 실제 게시글 목록을 담을 배열 - by 1-blue
  const [list, setList] = useState<any>([]);
  // 2022/05/06 - 게시글 담기 - by 1-blue
  useEffect(() => {
    setList(
      responsePosts?.map(({ posts }) =>
        posts.map((post, i) => (
          <Post
            key={post.id}
            post={post}
            photoSize="w-full h-[300px]"
            $priority={i < 4}
          />
        ))
      )
    );
  }, [responsePosts]);

  return (
    <>
      {/* 최신 게시글과 인기 게시글 네비게이터 */}
      <article>
        <MainNav />
      </article>

      {/* 게시글 리스트 */}
      <article>
        <ul className="grid gird-col-1 gap-x-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {list}
        </ul>
      </article>
    </>
  );
};

export default Home;
