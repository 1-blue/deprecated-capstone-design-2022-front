import { useState } from "react";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";

// type
import type {
  IPostWithUserAndKeywordAndCount,
  IPostWithUserAndCount,
  ResponseStatus,
} from "@src/types";

// common-component
import Spinner from "@src/components/common/Spinner";
import Photo from "@src/components/common/Photo";
import Markdown from "@src/components/common/Markdown";
import Post from "@src/components/Post";
import Modal from "@src/components/common/Modal";
import Keyword from "@src/components/common/Keyword";
import HeadInfo from "@src/components/common/HeadInfo";

// component
import CommentContainer from "@src/components/Comment/CommentContainer";
import Like from "@src/components/Like";
import TitleNav from "@src/components/TitleNav";

// util
import { dateFormat } from "@src/libs/dateFormat";
import { combineClassNames } from "@src/libs/util";

// hook
import useMe from "@src/hooks/useMe";
import useModal from "@src/hooks/useModal";
import useMutation from "@src/hooks/useMutation";
import useToastMessage from "@src/hooks/useToastMessage";

type ResponseOfDetailPost = {
  status: ResponseStatus;
  data: {
    post: IPostWithUserAndKeywordAndCount;
    error?: Error;
  };
};
type ResponseOfCategorizedPosts = {
  status: ResponseStatus;
  data: {
    category: string;
    posts: IPostWithUserAndCount[];
  };
};
type ResponseOfRelevantPosts = {
  status: ResponseStatus;
  data: {
    posts: IPostWithUserAndCount[];
  };
};
type ResponseOfRemovedPost = {
  status: ResponseStatus;
};

const PostDetail: NextPage<ResponseOfDetailPost> = ({
  status: { ok },
  data: { post },
}) => {
  const router = useRouter();
  const { me } = useMe();

  // 2022/04/30 - 현재 게시글과 같은 카테고리를 가진 게시글들 ( + 동일한 유저 ) - by 1-blue
  const { data: categorizedPosts } = useSWR<ResponseOfCategorizedPosts>(
    router.query.title ? `/api/post/${router.query.title}/categorized` : null
  );
  // 2022/04/30 - 카테고리 토글 변수 - by 1-blue
  const [toggleCategory, setToggleCategory] = useState(false);

  // 2022/04/30 - 현재 게시글과 연관된 게시글들 - by 1-blue
  const { data: relevantPosts } = useSWR<ResponseOfRelevantPosts>(
    router.query.title ? `/api/post/${router.query.title}/relevant` : null
  );

  // 2022/05/01 - 게시글 삭제 모달 - by 1-blue
  const [modalRef, isOpen, setIsOpen] = useModal();
  // 2022/05/01 - 게시글 삭제 요청 관련 메서드 - by 1-blue
  const [removePost, { data: removePostResponse, loading: removePostLoading }] =
    useMutation<ResponseOfRemovedPost>({
      url: router.query.title ? `/api/post/${router.query.title}` : null,
      method: "DELETE",
    });
  // 2022/05/01 - 게시글 삭제 시 성공 토스트 및 페이지 이동 - by 1-blue
  useToastMessage({
    ok: removePostResponse?.status.ok,
    message: `"${router.query.title}" 게시글을 삭제했습니다.`,
    go: "/",
  });

  if (!ok) return <span>에러 페이지</span>;

  return (
    <>
      <HeadInfo
        title={`${post.title}`}
        description={`${post.title}\n${post.summary}`}
        photo={`${post.thumbnail}`}
      />

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
          <time>{dateFormat(post.updatedAt, "YYYY-MM-DD")}</time>
          <div className="flex-1" />
          {me?.idx === post.user.idx && (
            <>
              <button
                type="button"
                className="text-gray-400 hover:text-black dark:hover:text-white"
                onClick={() =>
                  router.push(`/write?title=${router.query?.title}`)
                }
              >
                수정
              </button>
              <button
                type="button"
                className="text-gray-400 hover:text-black dark:hover:text-white"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                삭제
              </button>
            </>
          )}
        </section>

        {/* 키워드 */}
        <section>
          <Keyword keywords={post.keywords} />
        </section>

        {/* 같은 카테고리 게시글들 */}
        <section className="bg-zinc-300 dark:bg-zinc-700 px-8 py-6 rounded-md space-y-4">
          <h2 className="text-xl font-semibold">
            {categorizedPosts?.data.category}
          </h2>
          {toggleCategory && (
            <ul className="space-y-1">
              {categorizedPosts?.data.posts.map((post, index) => (
                <li key={post.idx}>
                  <span className="dark:text-gray-400">{index + 1}. </span>
                  <Link href={`/${post.user.name}/${post.title}`}>
                    <a
                      className={combineClassNames(
                        "font-semibold hover:text-indigo-500",
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
          {post.thumbnail?.includes(process.env.NEXT_PUBLIC_IMAGE_BASE_URL!) ? (
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

        {/* 댓글 영역 */}
        <CommentContainer postIdx={post.idx} allCount={post._count.comment} />
      </article>

      <hr />

      {/* 연관 게시글들 */}
      <section>
        <span className="block text-center mb-8 text-2xl">
          관심 있을만한 게시글
        </span>
        <ul className="grid gird-col-1 gap-x-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {relevantPosts?.data.posts.map((post) => (
            <Post key={post.idx} post={post} photoSize="w-full h-[200px]" />
          ))}
        </ul>
      </section>

      {/* 우측 네비게이션 */}
      <TitleNav contents={post.contents} />

      {/* 좋아요 버튼 */}
      <Like />

      {/* 게시글 삭제 모달 */}
      {isOpen && (
        <Modal ref={modalRef} noScroll primary>
          <form className="flex flex-col bg-zinc-900 p-8 rounded-md space-y-4 w-[400px]">
            <span className="font-bold text-2xl">포스트 삭제</span>
            <span>정말 포스트를 삭제하시겠습니까?</span>
            <div />
            <div className="text-right space-x-2">
              <button
                type="button"
                className="px-6 py-2 bg-indigo-400 rounded-md hover:bg-indigo-500"
              >
                취소
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-indigo-400 rounded-md hover:bg-indigo-500"
                onClick={() => removePost({})}
              >
                확인
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* 게시글 삭제 스피너 */}
      {removePostLoading && <Spinner kinds="page" />}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
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
        status: {
          ok: false,
        },
        data: {
          post: {},
          error,
        },
      },
    };
  }
};

export default PostDetail;
