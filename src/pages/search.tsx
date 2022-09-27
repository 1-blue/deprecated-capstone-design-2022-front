import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
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
import { ICON } from "@src/types";
import { ApiGetPostsOfSearchResponse } from "@src/types/api";

const limit = 10;

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

  // 2022/05/10 - 검색할 게시글 추가 패치 가능 여부 - by 1-blue
  const [hasMorePost, setHasMorePost] = useState(true);
  // 2022/05/10 - 검색할 게시글 패치 관련 데이터 - by 1-blue
  const {
    data: arrayOfPosts,
    setSize,
    isValidating,
  } = useSWRInfinite<ApiGetPostsOfSearchResponse>(
    debounce && (currentKeyword || router.query.keyword)
      ? (pageIndex, prevData) => {
          if (prevData && prevData.posts.length !== limit) {
            setHasMorePost(false);
            return null;
          }
          if (prevData && !prevData.posts.length) {
            setHasMorePost(false);
            return null;
          }

          const lastIdx =
            prevData?.posts?.[prevData.posts.length - 1].idx || -1;

          return `/api/posts?lastIdx=${lastIdx}&limit=${limit}&kinds=search&keyword=${
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

  if (isValidating && !currentKeyword) return <Spinner kinds="page" />;

  return (
    <>
      <HeadInfo
        title="Jslog | 게시글 검색"
        description="Jslog의 게시글 검색 페이지입니다."
        photo={arrayOfPosts?.[0].posts[0].photo}
      />

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
          <ul className="flex flex-col space-y-8 divide-y">
            {arrayOfPosts?.map(({ posts }) =>
              posts.map((post) => (
                <li key={post.idx} className="space-y-4 pt-8">
                  <Link href={`/${post.User.name}`}>
                    <a className="flex space-x-2 items-center mb-4">
                      <Avatar photo={post.User.photo} className="w-10 h-10" />
                      <span className="hover:underline underline-offset-2">
                        {post.User.name}
                      </span>
                    </a>
                  </Link>
                  <Link href={`/${post.User.name}/${post.title}`}>
                    <a className="space-y-4">
                      <Photo
                        photo={post.photo}
                        className="w-full py-[30%]"
                        $cover
                      />
                      <h3 className="text-lg font-bold mb-1">{post.title}</h3>
                      <p className="whitespace-pre text-sm mb-4">
                        {post.summary}
                      </p>
                    </a>
                  </Link>

                  <Keyword keywords={post.keywords} />

                  <div className="dark:text-gray-400 text-sm">
                    <time>{dateFormat(post.updatedAt, "YYYY년MM월DD일")}</time>
                    <span>ㆍ</span>
                    <span>{post._count.comments}개의 댓글</span>
                    <span>ㆍ</span>
                    <span>{post._count.favorites}개의 좋아요</span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </article>
      </div>
    </>
  );
};

export default Search;
