import { useRouter } from "next/router";

// util
import { combineClassNames } from "@src/libs";

// component
import Header from "@src/components/Header";

type Props = {
  children: React.ReactChild;
};

const Layout = ({ children }: Props) => {
  const { asPath } = useRouter();

  const hasHeader = asPath.includes("/write");
  const isResposive = asPath.includes("/write");

  return (
    <>
      {/* 상단 네비게이션 */}
      {hasHeader || <Header />}
      {/* 메인 컨텐츠 */}
      <main
        className={combineClassNames(
          "w-full mx-auto dark:text-white",
          isResposive
            ? ""
            : "px-4 sm:max-w-[540px] md:max-w-[868px] lg:max-w-[940px] xl:max-w-[1100px] 2xl:max-w-[1400px]"
        )}
      >
        {children}
      </main>

      {hasHeader || <footer className="mb-[10vh]" />}
    </>
  );
};

export default Layout;
