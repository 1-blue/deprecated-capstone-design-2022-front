import { useState } from "react";
import Link from "next/link";
import useSWRInfinite from "swr/infinite";

// api
import apiService from "@src/api";

// util
import { dateOrTimeFormat } from "@src/libs";

// hook
import useInfiniteScroll from "@src/hooks/useInfiniteScroll";

// component
import Photo from "@src/components/common/Photo";
import Keyword from "@src/components/common/Keyword";
import HeadInfo from "@src/components/common/HeadInfo";
import NotFoundPage from "@src/pages/404";
import ProfileNav from "@src/components/ProfileNav";
import Info from "@src/components/common/Support/Info";

// type
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import type { ApiGetPostsOfUserResponse, ApiGetUserResponse } from "@src/types";

type Props = {
  user: ApiGetUserResponse["user"];
};

const limit = 10;

const Profile: NextPage<Props> = ({ user }) => {
  // 2022/05/15 - 게시글 추가 패치 가능 여부 - by 1-blue
  const [hasMorePost, setHasMorePost] = useState(true);
  // 2022/05/15 - 게시글 패치 관련 데이터 - by 1-blue
  const {
    data: arrayOfPosts,
    setSize,
    isValidating: isFetchPosts,
  } = useSWRInfinite<ApiGetPostsOfUserResponse>((pageIndex, prevData) => {
    if (prevData && prevData.posts.length !== limit) {
      setHasMorePost(false);
      return null;
    }
    if (prevData && prevData.posts.length === 0) {
      setHasMorePost(false);
      return null;
    }

    const lastIdx = prevData?.posts?.[prevData.posts.length - 1].idx || -1;

    return `/api/posts?lastIdx=${lastIdx}&limit=${limit}&username=${user.name}`;
  });
  // 2022/05/15 - 게시글 스크롤링 시 패치하는 이벤트 등록 - by 1-blue
  useInfiniteScroll({
    condition: hasMorePost && !isFetchPosts,
    setSize,
  });

  if (!user) return <NotFoundPage text="존재하지 않는 유저입니다." />;

  return (
    <>
      <HeadInfo
        title={user.name}
        description={`${user.name}님의 프로필 페이지\n${user.introduction}`}
        photo={user.photo}
      />

      <ProfileNav
        avatar={user.photo}
        name={user.name}
        introduction={user.introduction}
      />

      {/* 게시글 리스트 */}
      <article className="md:mx-auto md:w-3/5 mt-8">
        {arrayOfPosts && arrayOfPosts?.[0].posts.length !== 0 ? (
          <ul className="space-y-4 divide-y">
            {arrayOfPosts?.map(({ posts }) =>
              posts.map((post) => (
                <li key={post.idx} className="space-y-4 pb-4 pt-8">
                  <Link href={`/${post.User.name}/${post.title}`}>
                    <a className="group space-y-4">
                      {post.photo && (
                        <Photo
                          photo={post.photo}
                          className="w-full pt-[50%]"
                          $cover
                          $scale
                        />
                      )}
                      <h3 className="text-xl font-bold">{post.title}</h3>
                      <p className="whitespace-pre text-sm text-gray-500 dark:text-gray-400">
                        {post.summary}
                      </p>

                      <Keyword keywords={post.keywords} />

                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        <time>
                          {dateOrTimeFormat(post.updatedAt, "YYYY년MM월DD일")}
                        </time>
                        <span>ㆍ</span>
                        <span>{post._count.comments}개의 댓글</span>
                        <span>ㆍ</span>
                        <span>{post._count.favorites}개의 좋아요</span>
                      </div>
                    </a>
                  </Link>
                </li>
              ))
            )}
          </ul>
        ) : (
          <Info text="내 게시글이 없습니다." />
        )}
      </article>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  if (!context.params) return { props: { user: null } };
  if (typeof context.params.name !== "string") return { props: { user: null } };

  try {
    const {
      data: { user },
    } = await apiService.userService.apiGetUser({
      name: context.params.name,
    });

    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  } catch (error) {
    console.error("[name]/index.tsx getServerSideProps >> ", error);
  }

  return { props: { user: null } };
};

export default Profile;
