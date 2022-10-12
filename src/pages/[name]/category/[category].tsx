import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";

// api
import apiService from "@src/api";

// util
import { dateOrTimeFormat } from "@src/libs/dateFormat";

// hook
import useMe from "@src/hooks/useMe";

// component
import ProfileNav from "@src/components/ProfileNav";
import Photo from "@src/components/common/Photo";
import HeadInfo from "@src/components/common/HeadInfo";

// type
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import type {
  ApiGetPostsOfUserAndCategoryResponse,
  ApiGetUserResponse,
} from "@src/types";

type PostProps = {
  post: ApiGetPostsOfUserAndCategoryResponse["posts"][0];
  user: ApiGetUserResponse["user"];
  i: number;
};

const Post = ({ post, user, i }: PostProps) => {
  return (
    <li className="space-y-2">
      <h3 className="font-semibold text-xl">
        {i + 1}. {post.title}
      </h3>
      <Link href={`/${user.name}/${post.title}`}>
        <a className="flex space-x-4">
          <div className="max-w-[240px] min-w-[200px] w-full h-[140px]">
            <Photo photo={post.photo} className="w-full h-full" $cover />
          </div>
          <div className="flex flex-col justify-between">
            <p className="whitespace-pre-line text-sm">{post.summary}</p>
            <time className="text-xs">
              {dateOrTimeFormat(post.updatedAt, "YYYY년MM월DD일")}
            </time>
          </div>
        </a>
      </Link>
    </li>
  );
};

type Props = {
  user: ApiGetUserResponse["user"];
};

const CategoryPost: NextPage<Props> = ({ user }) => {
  const router = useRouter();
  const { me } = useMe();

  // 2022/05/16 - 특정 유저의 해당 카테고리를 가진 게시글들 요청 - by 1-blue
  const { data: responseOfPosts } =
    useSWR<ApiGetPostsOfUserAndCategoryResponse>(
      router.query?.category
        ? `/api/user/category?userIdx=${user.idx}&category=${router.query.category}`
        : null
    );

  // 2022/05/16 - 게시글 정렬 기준 - by 1-blue
  const [isLatest, setIsLatest] = useState(false);

  if (!responseOfPosts) return <></>;
  if (responseOfPosts.posts.length === 0) return <></>;

  return (
    <>
      <HeadInfo
        title={"Jslog | " + router.query?.category}
        description="Jslog의 카테고리 페이지"
      />

      <ProfileNav
        avatar={user.photo}
        name={user.name}
        introduction={user.introduction}
      />

      <article className="md:mx-auto md:w-3/5 my-8 space-y-4">
        <h1 className="text-center font-bold text-3xl border-b pb-4">
          {router.query?.category}
        </h1>

        {me?.idx === user.idx && (
          <button
            type="button"
            className="block ml-auto text-gray-300 dark:text-gray-400 hover:text-black dark:hover:text-white hover:underline underline-offset-2"
          >
            삭제
          </button>
        )}

        <button
          type="button"
          className="block ml-auto"
          onClick={() => setIsLatest((prev) => !prev)}
        >
          {isLatest ? "▼ 내림차순" : "▲ 오름차순"}
        </button>

        <ul className="space-y-12">
          {responseOfPosts.posts && isLatest
            ? [...responseOfPosts.posts]
                .reverse()
                .map((post, i) => (
                  <Post key={post.idx} post={post} user={user} i={i} />
                ))
            : responseOfPosts.posts.map((post, i) => (
                <Post key={post.idx} post={post} user={user} i={i} />
              ))}
        </ul>
      </article>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
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
    console.error("/category/[category].tsx getServerSideProps >> ", error);
  }

  return { props: { user: null } };
};

export default CategoryPost;
