import { useState } from "react";
import useSWRInfinite from "swr/infinite";

// api
import apiService from "@src/api";

// component
import HeadInfo from "@src/components/common/HeadInfo";
import Info from "@src/components/common/Support/Info";
import Post from "@src/components/Post";
import MainNav from "@src/components/MainNav";

// hook
import useInfiniteScroll from "@src/hooks/useInfiniteScroll";

// type
import type { GetServerSideProps, NextPage } from "next";
import type { ApiGetPostsResponse } from "@src/types";

const limit = 10;

const Recent: NextPage<ApiGetPostsResponse> = (initialPosts) => {
  // 2022/05/06 - 게시글 추가 패치 가능 여부 - by 1-blue
  const [hasMorePost, setHasMorePost] = useState(true);
  // 2022/09/23 - 게시글 패치 관련 데이터 - by 1-blue
  const {
    data: arrayOfPosts,
    setSize,
    isValidating: isFetchPosts,
  } = useSWRInfinite<ApiGetPostsResponse>(
    (pageIndex, prevData) => {
      // 모든 게시글을 불러온 경우 ( 총 요청 개수 !== 응답 개수 || 응답 개수 === 0 )
      if (prevData && prevData.posts.length !== limit) {
        setHasMorePost(false);
        return null;
      }
      if (prevData && prevData.posts.length === 0) {
        setHasMorePost(false);
        return null;
      }

      const lastIdx = prevData?.posts?.[prevData.posts.length - 1].idx || -1;

      return `/api/posts?lastIdx=${lastIdx}&limit=${limit}&kinds=recent`;
    },
    null,
    {
      fallbackData: [initialPosts],
    }
  );

  // 2022/05/06 - 게시글 스크롤링 시 패치하는 이벤트 등록 - by 1-blue
  useInfiniteScroll({
    condition: hasMorePost && !isFetchPosts,
    setSize,
  });

  return (
    <>
      <HeadInfo
        title="Jslog | 최신 게시글"
        description="Jslog의 게시글들 ( 최신순 )"
        photo={arrayOfPosts?.[0].posts[0].photo}
      />

      {/* 최신 게시글과 인기 게시글 네비게이터 */}
      <article className="mb-4">
        <MainNav />
      </article>

      {/* 게시글 리스트 */}
      <article>
        {arrayOfPosts ? (
          <ul className="grid gird-col-1 gap-x-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {arrayOfPosts.map(({ posts }) =>
              posts.map((post) => <Post key={post.idx} post={post} />)
            )}
          </ul>
        ) : (
          <Info text="게시글이 없습니다." />
        )}
      </article>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  ApiGetPostsResponse
> = async () => {
  try {
    const { data } = await apiService.postService.apiGetPosts({
      lastIdx: -1,
      limit: 10,
      kinds: "recent",
    });

    return {
      props: {
        ...JSON.parse(JSON.stringify(data)),
      },
    };
  } catch (error) {
    console.error("recent.tsx getServerSideProps >> ", error);
  }

  return { props: { posts: [], message: "" } };
};

export default Recent;
