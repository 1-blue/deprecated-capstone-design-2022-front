import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import { useEffect, useState } from "react";
import Link from "next/link";
import useSWRInfinite from "swr/infinite";

// common-component
import Photo from "@src/components/common/Photo";
import Keyword from "@src/components/common/Keyword";
import HeadInfo from "@src/components/common/HeadInfo";

// component
import ProfileNav from "@src/components/ProfileNav";

// hook
import useInfiniteScroll from "@src/hooks/useInfiniteScroll";

// util
import { dateOrTimeFormat } from "@src/libs/dateFormat";

// type
import type { IPostWithUserAndKeywordAndCount, SimpleUser } from "@src/types";

type Props = {
  user: SimpleUser;
};
type ResponseOfPosts = {
  posts: IPostWithUserAndKeywordAndCount[];
};

const Profile: NextPage<Props> = ({ user }) => {
  // 2022/05/15 - 게시글 offset - by 1-blue
  const [offset, setOffset] = useState(20);
  // 2022/05/15 - 게시글 추가 패치 가능 여부 - by 1-blue
  const [hasMorePost, setHasMorePost] = useState(true);
  // 2022/05/15 - 게시글 패치 관련 데이터 - by 1-blue
  const { data: responsePosts, setSize } = useSWRInfinite<ResponseOfPosts>(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData.posts.length !== offset) {
        setHasMorePost(false);
        return null;
      }
      if (previousPageData && !previousPageData.posts.length) {
        setHasMorePost(false);
        return null;
      }
      return `/api/user/${user.name}/posts?page=${pageIndex}&offset=${offset}&kinds=latest`;
    }
  );
  // 2022/05/15 - 게시글 스크롤링 시 패치하는 이벤트 등록 - by 1-blue
  useInfiniteScroll({
    condition: hasMorePost,
    setSize,
  });
  // 2022/05/15 - 실제 게시글 목록을 담을 배열 - by 1-blue
  const [list, setList] = useState<any>([]);
  // 2022/05/15 - 게시글 담기 - by 1-blue
  useEffect(() => {
    setList(
      responsePosts?.map(({ posts }) =>
        posts?.map((post) => (
          <li key={post.idx} className="space-y-4 pb-4 pt-8">
            <Link href={`/${post.user.name}/${post.title}`}>
              <a className="space-y-4">
                <Photo photo={post.thumbnail} size="w-full pt-[50%]" $cover />
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="whitespace-pre text-sm text-gray-500 dark:text-gray-400">
                  {post.summary}
                </p>
              </a>
            </Link>

            <Keyword keywords={post.keywords} />

            <div className="text-xs text-gray-500 dark:text-gray-400">
              <time>{dateOrTimeFormat(post.updatedAt, "YYYY년MM월DD일")}</time>
              <span>ㆍ</span>
              <span>{post._count.comment}개의 댓글</span>
            </div>
          </li>
        ))
      )
    );
  }, [responsePosts]);

  return (
    <>
      <HeadInfo
        title={user.name}
        description={`${user.name}님의 프로필 페이지\n${user.introduction}`}
        photo={user.avatar}
      />

      <ProfileNav avatar={user.avatar} name={user.name} />

      {/* 게시글 리스트 */}
      <article className="md:mx-auto md:w-3/5 mt-8">
        <ul className="space-y-4 divide-y">{list}</ul>
      </article>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${context.params?.name}`
  ).then((res) => res.json());

  return {
    props: {
      user: response?.user,
    },
  };
};

export default Profile;
