import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

// commom-component
import Icon from "@src/components/common/Icon";
import Modal from "@src/components/common/Modal";
import Avatar from "@src/components/common/Avatar";

// type
import { ICON } from "@src/types";

// hook
import useUser from "@src/hooks/useMe";
import useModal from "@src/hooks/useModal";

type Props = {
  hasHeader: boolean;
};

const Header = ({ hasHeader }: Props) => {
  const { me } = useUser();
  const { theme, setTheme } = useTheme();
  const [modalRef, isOpen, setIsOpen] = useModal();

  return (
    <>
      {hasHeader ? (
        <header className="w-full mx-auto flex justify-between items-center dark:text-white pt-4 mb-12 px-4 sm:max-w-[540px] md:max-w-[868px] lg:max-w-[940px] xl:max-w-[1100px] 2xl:max-w-[1400px]">
          {/* 로그 */}
          <h1 className="py-4 font-bold">
            <Link href="/">
              <a>JSLog</a>
            </Link>
          </h1>

          {/* 네비게이션 */}
          <nav className="space-x-4 flex">
            {/* theme */}
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-10 h-10 rounded-full hover:bg-slate-200 inline-flex justify-center items-center dark:hover:text-black"
            >
              <Icon
                icon={theme === "dark" ? ICON.SUN : ICON.MOON}
                $fill
                className="w-7 h-7"
              />
            </button>
            {/* search */}
            <Link href="/search">
              <a className="w-10 h-10 rounded-full hover:bg-slate-200 inline-flex justify-center items-center dark:hover:text-black">
                <Icon icon={ICON.SEARCH} />
              </a>
            </Link>
            {/* ( 게시글 작성 and 모달창 ) or 로그인 */}
            {me ? (
              <>
                <Link href="/write">
                  <a className="h-10 rounded-r-full rounded-l-full px-4 border-2 border-black dark:border-white  hover:bg-black dark:hover:bg-slate-200 hover:text-white dark:hover:text-black leading-10">
                    새 글 작성
                  </a>
                </Link>
                <button
                  type="button"
                  className="flex items-center space-x-1 relative"
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <Avatar
                    photo={me.avatar}
                    size="w-10 h-10"
                    alt="유저 프로필 이미지"
                    $rouneded
                  />
                  <Icon
                    icon={ICON.CHEVRON_DOWN}
                    className="w-4 h-4 text-gray-400"
                  />
                  {isOpen && (
                    <Modal
                      className="absolute top-14 right-2 flex flex-col w-52 rounded-md list-none bg-zinc-200 dark:bg-zinc-700"
                      ref={modalRef}
                    >
                      <>
                        <Link href={`/${me.name}`}>
                          <a className="px-4 py-3 w-full text-left">내 정보</a>
                        </Link>

                        <Link href="/saves">
                          <a className="px-4 py-3 w-full text-left">임시 글</a>
                        </Link>

                        <Link href="/list/liked">
                          <a className="px-4 py-3 w-full text-left">
                            읽기 목록
                          </a>
                        </Link>

                        <Link href="/setting">
                          <a className="px-4 py-3 w-full text-left">설정</a>
                        </Link>
                        <button
                          type="button"
                          className="px-4 py-3 w-full text-left"
                        >
                          로그아웃
                        </button>
                      </>
                    </Modal>
                  )}
                </button>
              </>
            ) : (
              <button
                type="button"
                className="h-10 rounded-r-full rounded-l-full px-4 hover:bg-slate-200 dark:hover:text-black"
              >
                <span>로그인</span>
              </button>
            )}
          </nav>
        </header>
      ) : null}
    </>
  );
};

export default Header;
