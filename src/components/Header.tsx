import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";

// util
import { combineClassNames, throttleHelper } from "@src/libs";

// hook
import useModal from "@src/hooks/useModal";

// component
import Icon from "@src/components/common/Icon";
import Modal from "@src/components/common/Modal";
import Avatar from "@src/components/common/Avatar";

// type
import { ICON } from "@src/types";

const Header = () => {
  const { data, status } = useSession();
  const { theme, setTheme } = useTheme();
  const [modalRef, isOpen, setIsOpen] = useModal();

  // 2022/05/11 - 헤더 숨김 여부 변수 - by 1-blue
  const [hide, setHide] = useState(false);
  // 2022/05/11 - 현재 스크롤 위치값 저장할 변수 - by 1-blue
  const [pageY, setPageY] = useState(0);
  // 2022/05/11 - 현재 스크롤을 내렸는지 올렸는지 확인할 스크롤 이벤트 함수 - by 1-blue
  const handleScroll = useCallback(() => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && deltaY >= 0;
    setHide(hide);
    setPageY(pageYOffset);
  }, [pageY]);
  // 2022/05/11 - 스크롤 이벤트에 스로틀링 적용 - by 1-blue
  const throttleScroll = throttleHelper(handleScroll, 50);
  // 2022/05/11 - 스크롤 이벤트 등록 - by 1-blue
  useEffect(() => {
    document.addEventListener("scroll", throttleScroll);
    return () => document.removeEventListener("scroll", throttleScroll);
  }, [throttleScroll]);

  // 2022/05/11 - SSR + localstorage 경고 해결하기 위한 변수 - by 1-blue
  const [loaded, setLoaded] = useState(false);
  useEffect(
    () => window.addEventListener("load", () => setLoaded(true)),
    [setLoaded]
  );

  return (
    <header
      className={combineClassNames(
        "sticky top-0 w-full bg-zinc-200 dark:bg-zinc-900 z-10 transition-transform duration-300",
        hide ? "-translate-y-20" : "translate-y-0"
      )}
    >
      <header className="w-full mx-auto flex justify-between items-center dark:text-white py-2 mb-12 px-4 sm:max-w-[540px] md:max-w-[868px] lg:max-w-[940px] xl:max-w-[1100px] 2xl:max-w-[1400px]">
        {/* 로고 */}
        <h1 className="py-4 font-bold">
          <Link href="/">
            <a>Blelog</a>
          </Link>
        </h1>

        {/* 네비게이션 */}
        <nav className="space-x-4 flex">
          {/* theme */}
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-10 h-10 rounded-full hover:bg-zinc-400 dark:hover:bg-slate-200 inline-flex justify-center items-center dark:hover:text-black"
          >
            {loaded ? (
              <Icon
                icon={theme === "dark" ? ICON.SUN : ICON.MOON}
                $fill
                className="w-6 h-6 sm:w-7 sm:h-7"
              />
            ) : (
              <Icon icon={ICON.MOON} $fill className="w-6 h-6 sm:w-7 sm:h-" />
            )}
          </button>
          {/* search */}
          <Link href="/search">
            <a className="w-10 h-10 rounded-full hover:bg-zinc-400 dark:hover:bg-slate-200 inline-flex justify-center items-center dark:hover:text-black">
              <Icon icon={ICON.SEARCH} className="w-6 h-6 sm:w-7 sm:h-" />
            </a>
          </Link>
          {/* ( 게시글 작성 and 모달창 ) or 로그인 */}
          {status === "authenticated" ? (
            <>
              <Link href="/write">
                <a className="flex justify-center items-center h-10 rounded-r-full rounded-l-full px-3 sm:px-4 border-2 border-black dark:border-white hover:bg-black dark:hover:bg-slate-200 hover:text-white dark:hover:text-black leading-10">
                  <span className="text-sm sm:text-base">새 글 작성</span>
                </a>
              </Link>
              <button
                type="button"
                className="flex items-center space-x-1 relative"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <Avatar
                  photo={data.user.photo}
                  className="w-10 h-10"
                  alt="유저 프로필 이미지"
                  priority
                />
                <Icon
                  icon={ICON.CHEVRON_DOWN}
                  className="w-4 h-4 text-gray-400"
                />
                {isOpen && (
                  <Modal
                    className="absolute top-14 right-2 flex flex-col w-52 rounded-md list-none bg-zinc-200 dark:bg-zinc-700 overflow-hidden"
                    ref={modalRef}
                  >
                    <>
                      <Link href={`/${data.user.name}`}>
                        <a className="px-4 py-3 w-full text-left hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                          내 정보
                        </a>
                      </Link>

                      <Link href="/saves">
                        <a className="px-4 py-3 w-full text-left hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                          임시 글
                        </a>
                      </Link>

                      <Link href="/list/liked">
                        <a className="px-4 py-3 w-full text-left hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                          읽기 목록
                        </a>
                      </Link>

                      <Link href="/setting">
                        <a className="px-4 py-3 w-full text-left hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                          설정
                        </a>
                      </Link>
                      <button
                        type="button"
                        className="px-4 py-3 w-full text-left hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors cursor-pointer"
                        onClick={() => signOut()}
                      >
                        로그아웃
                      </button>
                    </>
                  </Modal>
                )}
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <a className="h-10 rounded-r-full rounded-l-full px-4 hover:bg-zinc-400 dark:hover:bg-slate-200 dark:hover:text-black flex justify-center items-center">
                  <b>로그인</b>
                </a>
              </Link>
              <Link href="/register">
                <a className="h-10 rounded-r-full rounded-l-full px-4 hover:bg-zinc-400 dark:hover:bg-slate-200 dark:hover:text-black flex justify-center items-center">
                  <b>회원가입</b>
                </a>
              </Link>
            </>
          )}
        </nav>
      </header>
    </header>
  );
};

export default Header;
