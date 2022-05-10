import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWRInfinite from "swr/infinite";

// common-component
import Avatar from "@src/components/common/Avatar";
import Icon from "@src/components/common/Icon";
import Photo from "@src/components/common/Photo";
import Spinner from "@src/components/common/Spinner";

// hook
import useInfiniteScroll from "@src/hooks/useInfiniteScroll";

// util
import { dateFormat } from "@src/libs/dateFormat";

// type
import { ICON, Post as PostType } from "@src/types";

type SearchForm = {
  keyword: string;
};

type ResponseOfDetailPosts = {
  ok: boolean;
  posts: PostType[];
};

const Search: NextPage = () => {
  const router = useRouter();

  // 2022/05/10 - 검색 관련 메서드 - by 1-blue
  const { register, handleSubmit } = useForm<SearchForm>();
  // 2022/05/10 - 검색 - by 1-blue
  const onSearch = useCallback(
    ({ keyword }: SearchForm) => router.push(`/search?keyword=${keyword}`),
    [router]
  );

  // 2022/05/10 - 검색할 게시글 offset - by 1-blue
  const [offset, setOffset] = useState(20);
  // 2022/05/10 - 검색할 게시글 추가 패치 가능 여부 - by 1-blue
  const [hasMorePost, setHasMorePost] = useState(true);
  // 2022/05/10 - 검색할 게시글 패치 관련 데이터 - by 1-blue
  const {
    data: responsePosts,
    setSize,
    isValidating,
  } = useSWRInfinite<ResponseOfDetailPosts>(
    router.query.keyword
      ? (pageIndex, previousPageData) => {
          if (previousPageData && previousPageData.posts.length !== offset) {
            setHasMorePost(false);
            return null;
          }
          if (previousPageData && !previousPageData.posts.length) {
            setHasMorePost(false);
            return null;
          }
          return `/api/posts?page=${pageIndex}&offset=${offset}&kinds=&latest=${router.query.keyword}`;
        }
      : () => null
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
        posts?.map((post) => (
          <li key={post.id} className="space-y-4 pt-8">
            <Link href={`/${post.user.name}`}>
              <a className="flex space-x-2 items-center mb-4">
                <Avatar photo={post.user.avatar} size="w-10 h-10" $rouneded />
                <span className="hover:underline underline-offset-2">
                  {post.user.name}
                </span>
              </a>
            </Link>
            <Link href={`/${post.user.name}/${post.title}`}>
              <a className="space-y-4">
                <Photo photo={post.thumbnail} size="w-full py-[30%]" $cover />
                <h3 className="text-lg font-bold mb-1">{post.title}</h3>
                <p className="whitespace-pre text-sm mb-4">{post.summary}</p>
              </a>
            </Link>
            <ul className="flex flex-wrap space-x-2">
              {post.keywords.map(({ keyword }) => (
                <li
                  key={keyword}
                  className="bg-zinc-200 text-indigo-600 hover:bg-zinc-300 hover:text-indigo-700 dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:text-indigo-300 dark:hover:text-indigo-400 font-semibold py-2 px-4 mb-2 rounded-md cursor-pointer"
                  onClick={() => router.push(`/search?keyword=${keyword}`)}
                >
                  {keyword}
                </li>
              ))}
            </ul>
            <div className="dark:text-gray-400 text-sm">
              <span>{dateFormat(post.updatedAt, "YYYY년MM월DD일")}</span>
              <span>ㆍ</span>
              <span>{post._count.comments}개의 댓글</span>
            </div>
          </li>
        ))
      )
    );
  }, [router, setList, responsePosts]);

  console.log("router.query.keyword >> ", router);

  if (isValidating) return <Spinner kinds="page" />;

  return (
    <div className="w-full md:w-[630px] flex flex-col mx-auto space-y-10">
      <form
        onSubmit={handleSubmit(onSearch)}
        className="flex justify-center items-center"
      >
        <input
          type="search"
          placeholder="검색어를 입력하세요"
          {...register("keyword")}
          className="px-4 py-3 md:py-4 w-full focus:outline-none border border-gray-400 dark:border-gray-200 md:text-xl font-bold md:placeholder:text-xl placeholder:font-bold"
        />
        <button type="submit" className="border p-3 md:p-4">
          <Icon icon={ICON.SEARCH} className="w-6 h-6 md:w-7 md:h-7" />
        </button>
      </form>

      <article>
        <ul className="flex flex-col space-y-8 divide-y">{list}</ul>
      </article>
    </div>
  );
};

export default Search;
