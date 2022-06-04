import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";

// component
import ProfileNav from "@src/components/ProfileNav";

// type
import type {
  IPostWithUserAndCount,
  ResponseStatus,
  SimpleUser,
} from "@src/types";

// common-component
import Photo from "@src/components/common/Photo";

// hook
import useMe from "@src/hooks/useMe";

// util
import { dateOrTimeFormat } from "@src/libs/dateFormat";

type PostProps = {
  post: IPostWithUserAndCount;
  user: SimpleUser;
  i: number;
};

const Post = ({ post, user, i }: PostProps) => {
  return (
    <li className="space-y-2">
      <h3 className="font-semibold text-lg">
        {i + 1}. {post.title}
      </h3>
      <Link href={`/${user.name}/${post.title}`}>
        <a className="flex space-x-4">
          <div className="max-w-[240px] min-w-[200px] w-full h-[140px]">
            <Photo photo={post.thumbnail} size="w-full h-full" $cover />
          </div>
          {/* <div className="bg-gray-400 w-[150px] pt-[20%]" /> */}
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
  user: SimpleUser;
};
type ReponseOfPosts = {
  status: ResponseStatus;
  data: {
    posts: IPostWithUserAndCount[];
  };
};

const CategoryPost: NextPage<Props> = ({ user }) => {
  const router = useRouter();
  const { me } = useMe();

  // 2022/05/16 - 특정 유저의 해당 카테고리를 가진 게시글들 요청 - by 1-blue
  const { data: responseOfPosts } = useSWR<ReponseOfPosts>(
    router.query?.category
      ? `/api/posts?username=${user.name}&category=${router.query.category}`
      : null
  );

  // 2022/05/16 - 게시글 정렬 기준 - by 1-blue
  const [isLatest, setIsLatest] = useState(false);

  return (
    <>
      <ProfileNav avatar={user.avatar} name={user.name} />

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
          {responseOfPosts?.data.posts && isLatest
            ? [...responseOfPosts.data.posts]
                .reverse()
                .map((post, i) => (
                  <Post key={post.idx} post={post} user={user} i={i} />
                ))
            : responseOfPosts?.data.posts.map((post, i) => (
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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${context.params?.name}`
  ).then((res) => res.json());

  return {
    props: {
      user: response?.data.user,
    },
  };
};

export default CategoryPost;
