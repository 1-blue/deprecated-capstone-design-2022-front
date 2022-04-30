import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";

// type
import {
  Comment,
  ICON,
  Post as PostType,
  SimplePost,
  SimpleUser,
} from "@src/types";

// common-component
import Spinner from "@src/components/common/Spinner";
import Photo from "@src/components/common/Photo";
import Markdown from "@src/components/common/Markdown";
import Post from "@src/components/Post";
import Icon from "@src/components/common/Icon";

// util
import { dateFormat, timeFormat } from "@src/libs/dateFormat";
import { combineClassNames } from "@src/libs/util";

// hook
import useMe from "@src/hooks/useMe";

type PostResponse = {
  ok: boolean;
  post: PostType;
  error?: Error;
};
type CategorizedPostsResponse = {
  ok: boolean;
  category: string;
  posts: SimplePost[];
};
type RelevantPostsResponse = {
  ok: boolean;
  posts: SimplePost[];
};
type CommentForm = {
  comment: string;
};
interface ICommentWithUser extends Comment {
  user: SimpleUser;
}
type CommentsResponse = {
  ok: boolean;
  comments: ICommentWithUser[];
};

const PostDetail: NextPage<PostResponse> = ({ ok, post }) => {
  const router = useRouter();
  const { me } = useMe();

  // 2022/04/30 - 현재 게시글과 같은 카테고리를 가진 게시글들 ( + 동일한 유저 ) - by 1-blue
  const { data: categorizedPosts } = useSWR<CategorizedPostsResponse>(
    router.query.title ? `/api/post/${router.query.title}/categorized` : null
  );
  // 2022/04/30 - 카테고리 토글 변수 - by 1-blue
  const [toggleCategory, setToggleCategory] = useState(false);

  // 2022/04/30 - 현재 게시글과 연관된 게시글들 - by 1-blue
  const { data: relevantPosts } = useSWR<RelevantPostsResponse>(
    router.query.title ? `/api/post/${router.query.title}/relevant` : null
  );

  // 2022/04/30 - 해당 게시글의 댓글 패치 - by 1-blue
  const { data: commentsResponse } = useSWR<CommentsResponse>(
    router.query.title ? `/api/post/${router.query.title}/comment` : null
  );

  // 2022/04/30 - 댓글 입력 관련 메서드들 - by 1-blue
  const { handleSubmit, register } = useForm<CommentForm>();
  // 2022/04/30 - comment Ref - by 1-blue
  const { ref, ...rest } = register("comment");
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  // 2022/04/30 - textarea 자동 높이 조절 - by 1-blue
  const handleResizeHeight = useCallback(() => {
    if (!commentRef.current) return;

    commentRef.current.style.height = "auto";
    commentRef.current.style.height = commentRef.current?.scrollHeight + "px";
  }, [commentRef]);

  if (router.isFallback) return <Spinner kinds="page" />;
  if (!ok) return <span>에러 페이지</span>;

  return (
    <>
      <article className="max-w-[768px] md:w-[60vw] mx-4 md:mx-auto space-y-8 mb-40">
        {/* 제목  */}
        <section>
          <h1 className="text-5xl font-bold">{post.title}</h1>
        </section>

        {/* 작성자, 작성일, 수정, 삭제 */}
        <section className="flex space-x-2">
          <Link href={`/${post.user.name}`}>
            <a className="hover:underline underline-offset-2">
              {post.user.name}
            </a>
          </Link>
          <span>ㆍ</span>
          <span>{dateFormat(post.updatedAt, "YYYY-MM-DD")}</span>
          <div className="flex-1" />
          {me?.id === post.user.id && (
            <>
              <button
                type="button"
                className="text-gray-400 hover:text-black dark:hover:text-white"
              >
                수정
              </button>
              <button
                type="button"
                className="text-gray-400 hover:text-black dark:hover:text-white"
              >
                삭제
              </button>
            </>
          )}
        </section>

        {/* 키워드 */}
        <section>
          <ul className="flex flex-wrap space-x-2">
            {post.keywords.map(({ keyword }) => (
              <li
                key={keyword}
                className="bg-zinc-200 text-indigo-600 hover:bg-zinc-300 hover:text-indigo-700 dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:text-indigo-300 dark:hover:text-indigo-400 font-semibold py-2 px-4 mb-2 rounded-md cursor-pointer"
              >
                {keyword}
              </li>
            ))}
          </ul>
        </section>

        {/* 같은 카테고리 게시글들 */}
        <section className="bg-zinc-300 dark:bg-zinc-700 px-8 py-6 rounded-md space-y-4">
          <h2 className="text-xl font-semibold">
            {categorizedPosts?.category}
          </h2>
          {toggleCategory && (
            <ul className="space-y-1">
              {categorizedPosts?.posts.map((post, index) => (
                <li key={post.id}>
                  <span className="dark:text-gray-400">{index + 1}. </span>
                  <Link href={`/${post.user.name}/${post.title}`}>
                    <a
                      className={combineClassNames(
                        "font-semibold",
                        router.query.title === post.title
                          ? "text-indigo-400"
                          : ""
                      )}
                    >
                      {post.title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            onClick={() => setToggleCategory((prev) => !prev)}
          >
            {toggleCategory ? "▲ 숨기기" : "▼ 목록 보기"}
          </button>
        </section>

        {/* 섬네일 */}
        <section>
          {post.thumbnail.includes(process.env.NEXT_PUBLIC_IMAGE_BASE_URL!) ? (
            <Photo
              photo={post.thumbnail}
              size="w-full h-80"
              className="m-0"
              $cover
            />
          ) : (
            <figure
              className="w-full h-80 m-0 bg-contain bg-no-repeat bg-center"
              style={{
                backgroundImage: `url("${post.thumbnail}")`,
              }}
            >
              <img src={post.thumbnail} hidden />
            </figure>
          )}
        </section>

        {/* 내용 */}
        <section>
          <Markdown markdown={post.contents} />
        </section>

        <hr />

        {/* 작성자 정보 */}
        <section className="flex items-center space-x-4">
          <Photo
            photo={post.user.avatar}
            size="w-20 h-20"
            alt="유저 이미지"
            $rouneded
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold">{post.user.name}</span>
            <span>{post.user.introduction}</span>
          </div>
        </section>

        <hr />

        {/* 댓글 작성 */}
        <section className="space-y-4">
          <span className="font-semibold">{"n"}개의 댓글</span>
          <form className="space-y-4">
            <textarea
              placeholder="댓글을 작성하세요"
              {...rest}
              className="w-full p-4 focus:outline-none resize-none rounded-sm bg-zinc-200 dark:bg-zinc-600"
              onInput={handleResizeHeight}
              ref={(e) => {
                ref(e);
                commentRef.current = e;
              }}
            />
            <button
              type="submit"
              className="block ml-auto font-semibold bg-indigo-400 text-white dark:bg-indigo-500 dark:text-black py-2 px-4 rounded-md"
            >
              댓글 작성
            </button>
          </form>
        </section>

        {/* 댓글들 */}
        <section>
          <ul className="divide-y dark:divide-gray-400">
            {commentsResponse?.comments.map((comment) => (
              <li key={comment.idx} className="space-y-4 pt-4">
                {/* 아바타, 이름, 작성시간 */}
                <div className="flex space-x-2">
                  <Photo
                    photo={comment.user.avatar}
                    size="w-14 h-14"
                    alt="유저 이미지"
                    $rouneded
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold">{comment.user.name}</span>
                    <time className="text-sm dark:text-gray-400">
                      {timeFormat(comment.updatedAt)}
                    </time>
                  </div>
                </div>

                {/* 내용 */}
                <p className="whitespace-pre-line">{comment.contents}</p>

                {/* 답글 */}
                <div></div>
              </li>
            ))}
          </ul>
        </section>
      </article>

      <hr />

      {/* 연관 게시글들 */}
      <section>
        <span className="block text-center mb-8 text-2xl">
          관심 있을만한 게시글
        </span>
        <ul className="grid gird-col-1 gap-x-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {relevantPosts?.posts.map((post) => (
            <Post key={post.id} post={post} photoSize="w-full h-[200px]" />
          ))}
        </ul>
      </section>

      {/* 좌측 좋아요 */}
      <aside className="fixed top-[10%] left-[4%] bg-zinc-200 text-gray-400 py-3 px-2 rounded-full flex flex-col items-center">
        <button
          type="button"
          className="p-2 border-2 bg-zinc-300 border-gray-400 hover:border-indigo-500 hover:text-indigo-500 rounded-full"
        >
          <Icon icon={ICON.HEART} />
        </button>
        <span className="font-semibold text-gray-600">{"n"}</span>
      </aside>

      {/* 우측 네비게이션 */}
      <aside></aside>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  try {
    const post = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/post/${context.params?.title}`
    ).then((res) => res.json());

    return {
      props: {
        ...JSON.parse(JSON.stringify(post)),
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        ok: false,
        post: {},
        error,
      },
    };
  }
};

export default PostDetail;
