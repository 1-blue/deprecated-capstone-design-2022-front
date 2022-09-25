import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

// type
import type {
  ApiGetPostByRelevantResponse,
  ApiGetPostResponse,
  ApiGetPostsByCategoryResponse,
} from "@src/types";

// component
import HeadInfo from "@src/components/common/HeadInfo";
import Spinner from "@src/components/common/Spinner";
import Photo from "@src/components/common/Photo";
import Markdown from "@src/components/common/Markdown";
import Post from "@src/components/Post";
import Modal from "@src/components/common/Modal";
import Keyword from "@src/components/common/Keyword";
import CommentContainer from "@src/components/Comment/CommentContainer";
import Favorite from "@src/components/Favorite";
import TitleNav from "@src/components/TitleNav";

// util
import { combineClassNames, dateOrTimeFormat } from "@src/libs";

// hook
import useModal from "@src/hooks/useModal";

// api
import apiService from "@src/api";

// type
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import { AxiosError } from "axios";

type Props = {
  post: ApiGetPostResponse["post"];
  posts: ApiGetPostsByCategoryResponse["posts"];
};

const PostDetail: NextPage<Props> = ({ post: postData, posts }) => {
  const router = useRouter();
  const { status, data } = useSession();

  // 2022/09/24 - 현재 게시글 상세 데이터 요청 - by 1-blue
  const { data: responsePost, mutate: postMutate } = useSWR<ApiGetPostResponse>(
    postData
      ? `/api/post?name=${postData.User.name}&title=${postData.title}`
      : null,
    null,
    { fallbackData: { post: postData, message: "" } }
  );

  // 2022/04/30 - 카테고리 토글 변수 - by 1-blue
  const [toggleCategory, setToggleCategory] = useState(false);

  // 2022/09/24 - 현재 게시글과 연관된 게시글들 - by 1-blue
  const { data: relevantResult } = useSWR<ApiGetPostByRelevantResponse>(
    postData ? `/api/post/relevant?postIdx=${postData.idx}` : null
  );

  // 2022/05/01 - 게시글 삭제 모달 - by 1-blue
  const [modalRef, isOpen, setIsOpen] = useModal();
  // 2022/09/24 - 게시글 삭제중인지 확인할 변수 - by 1-blue
  const [isDeleting, setIsDeleting] = useState(false);
  // 2022/09/24 - 현재 게시글 제거 요청 - by 1-blue
  const onDeletePost = useCallback(() => {
    if (!postData) return;

    setIsDeleting(true);

    apiService.postService
      .apiDeletePost({ postIdx: postData.idx })
      .then(({ data: { message } }) => {
        toast.success(message);
        router.push("/");
      })
      .catch((error) => {
        console.error(error);

        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("서버측 오류입니다. \n잠시후에 다시 시도해주세요!");
        }
      })
      .finally(() => {
        setIsDeleting(false);
      });
  }, [postData, router]);

  // 2022/09/24 - 좋아요 요청 - by 1-blue
  const onCreateFavorite = useCallback(async () => {
    if (status !== "authenticated")
      return toast.error("로그인을 해야 누를 수 있습니다.");

    try {
      const {
        data: { message },
      } = await apiService.postService.apiCreateFavorite({
        postIdx: postData.idx,
      });

      toast.success(message);

      postMutate(
        (prev) =>
          prev && {
            ...prev,
            post: {
              ...prev.post,
              favorites: [...prev.post.favorites, { userIdx: data.user.idx }],
            },
          },
        false
      );
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("서버 문제가 발생했습니다. \n잠시후에 다시 시도해주세요");
      }
    }
  }, [status, data, postMutate, postData]);
  // 2022/09/24 - 좋아요 취소 요청 - by 1-blue
  const onDeleteFavorite = useCallback(async () => {
    if (status !== "authenticated")
      return toast.error("로그인을 해야 누를 수 있습니다.");

    try {
      const {
        data: { message },
      } = await apiService.postService.apiDeleteFavorite({
        postIdx: postData.idx,
      });

      toast.success(message);

      postMutate(
        (prev) =>
          prev && {
            ...prev,
            post: {
              ...prev.post,
              favorites: prev.post.favorites.filter(
                ({ userIdx }) => userIdx !== data.user.idx
              ),
            },
          },
        false
      );
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("서버 문제가 발생했습니다. \n잠시후에 다시 시도해주세요");
      }
    }
  }, [status, data, postMutate, postData]);

  // >>> 에러 페이지
  if (!responsePost || !responsePost.post) return <span>에러 페이지!</span>;

  const post = responsePost.post;

  return (
    <>
      <HeadInfo
        title={post.title}
        description={`${post.title}\n${post.contents}`}
        photo={post.photo}
      />

      <article className="max-w-[768px] md:w-[60vw] mx-4 md:mx-auto space-y-8 mb-40">
        {/* 제목  */}
        <section>
          <h1 className="text-5xl font-bold">{post.title}</h1>
        </section>

        {/* 작성자, 작성일, 수정, 삭제 */}
        <section className="flex space-x-2">
          <Link href={`/${post.User.name}`}>
            <a className="hover:underline underline-offset-2">
              {post.User.name}
            </a>
          </Link>
          <span>ㆍ</span>
          <time>{dateOrTimeFormat(post.updatedAt, "YYYY-MM-DD")}</time>
          <div className="flex-1" />
          {status === "authenticated" && data.user.idx === post.User.idx && (
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
          <h2 className="text-xl font-semibold">{post.cateogoryIdx}</h2>
          {toggleCategory && (
            <ul className="space-y-1">
              {posts.map(({ title }, index) => (
                <li key={title}>
                  <span className="dark:text-gray-400">{index + 1}. </span>
                  <Link href={`/${data?.user.name}/${title}`}>
                    <a
                      className={combineClassNames(
                        "font-semibold hover:text-indigo-500",
                        router.query.title === title ? "text-indigo-400" : ""
                      )}
                    >
                      {title}
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
          <Photo photo={post.photo} className="w-full h-[60vh] m-0" $cover />
        </section>

        {/* 내용 */}
        <section>
          <Markdown markdown={post.contents} />
        </section>

        <hr />

        {/* 작성자 정보 */}
        <section className="flex items-center space-x-4">
          <Photo
            photo={post.User.photo}
            className="w-[80px] h-[80px] self-start"
            alt="유저 이미지"
            $cover
            $rouneded
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold">{post.User.name}</span>
            <p className="whitespace-pre">{post.User.introduction}</p>
          </div>
        </section>

        <hr />

        {/* 댓글 영역 */}
        <CommentContainer postIdx={post.idx} allCount={post._count.comments} />
      </article>

      <hr />

      {/* 연관 게시글들 */}
      <section>
        <span className="block text-center mb-8 text-2xl">
          관심 있을만한 게시글
        </span>
        <ul className="grid gird-col-1 gap-x-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {relevantResult?.relenvantPosts.map((post) => (
            <Post key={post.idx} post={post} />
          ))}
        </ul>
      </section>

      {/* 우측 네비게이션 */}
      <TitleNav contents={post.contents} />

      {/* 좋아요 버튼 */}
      <Favorite
        favorites={post.favorites}
        onCreateFavorite={onCreateFavorite}
        onDeleteFavorite={onDeleteFavorite}
      />

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
                onClick={onDeletePost}
              >
                확인
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* 게시글 삭제 스피너 */}
      {isDeleting && <Spinner kinds="page" />}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { name, title } = context.query;

    if (typeof name !== "string" || typeof title !== "string") {
      return { props: {} };
    }

    const {
      data: { post },
    } = await apiService.postService.apiGetPost({ name, title });
    const {
      data: { posts },
    } = await apiService.postService.apiGetPostsByCategory({
      postIdx: post.idx,
      userIdx: post.User.idx,
    });

    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
        posts: JSON.parse(JSON.stringify(posts)),
      },
    };
  } catch (error) {
    console.error("[name]/[title]/index.tsx >> ", error);

    return { props: {} };
  }
};

export default PostDetail;
