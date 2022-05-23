import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";

// common-component
import Avatar from "@src/components/common/Avatar";
import Icon from "@src/components/common/Icon";
import Photo from "@src/components/common/Photo";
import Spinner from "@src/components/common/Spinner";
import Keyword from "@src/components/common/Keyword";
import HeadInfo from "@src/components/common/HeadInfo";

// hook
import useInfiniteScroll from "@src/hooks/useInfiniteScroll";

// util
import { dateFormat } from "@src/libs/dateFormat";

// type
import { ICON, ResponseStatus } from "@src/types";
import type { IPostWithUserAndKeywordAndCount } from "@src/types";

type ResponseOfDetailPosts = {
  status: ResponseStatus;
  data: {
    posts: IPostWithUserAndKeywordAndCount[];
  };
};

const Search: NextPage = () => {
  const router = useRouter();

  // 2022/05/11 - 디바운싱에 사용할 타이머 아이디 저장 변수 - by 1-blue
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);
  // 2022/05/11 - 디바운싱 변수 - by 1-blue
  const [debounce, setDebounce] = useState(true);
  // 2022/05/11 - 현재 키워드 값 저장할 변수 - by 1-blue
  const [currentKeyword, setCurrentKeyword] = useState("");
  // 2022/05/11 - 키워드 변경 이벤트 함수 - by 1-blue
  const onChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentKeyword(e.target.value);
      setDebounce(false);

      if (timerId.current) clearTimeout(timerId.current);
      timerId.current = setTimeout(() => setDebounce(true), 300);
    },
    [timerId]
  );
  // 2022/05/11 - 키워드 검색 함수 - by 1-blue
  const onSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      router.push(`/search?keyword=${currentKeyword}`);
      setCurrentKeyword("");
    },
    [router, currentKeyword, setCurrentKeyword]
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
    debounce && (currentKeyword || router.query.keyword)
      ? (pageIndex, previousPageData) => {
          if (
            previousPageData?.data &&
            previousPageData.data.posts.length !== offset
          ) {
            setHasMorePost(false);
            return null;
          }
          if (previousPageData?.data && !previousPageData.data.posts.length) {
            setHasMorePost(false);
            return null;
          }
          return `/api/posts?page=${pageIndex}&offset=${offset}&kinds=latest&keyword=${
            currentKeyword || router.query.keyword
          }`;
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
    if (!responsePosts || responsePosts?.length === 0) return;

    setList(
      responsePosts.map(({ data: { posts } }) =>
        posts?.map((post) => (
          <li key={post.idx} className="space-y-4 pt-8">
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
            <Keyword keywords={post.keywords} />
            <div className="dark:text-gray-400 text-sm">
              <time>{dateFormat(post.updatedAt, "YYYY년MM월DD일")}</time>
              <span>ㆍ</span>
              <span>{post._count.comment}개의 댓글</span>
            </div>
          </li>
        ))
      )
    );
  }, [router, setList, responsePosts]);

  if (isValidating && !currentKeyword) return <Spinner kinds="page" />;

  return (
    <>
      <HeadInfo title="게시글 검색" description="blelog의 게시글 검색" />

      <div className="w-full md:w-[630px] flex flex-col mx-auto space-y-10">
        <form onSubmit={onSearch} className="flex justify-center items-center">
          <input
            type="search"
            placeholder="검색어를 입력하세요"
            onChange={onChangeKeyword}
            value={currentKeyword}
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
    </>
  );
};

export default Search;
