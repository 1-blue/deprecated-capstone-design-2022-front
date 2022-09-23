// component
import Header from "@src/components/Header";

// util
import { combineClassNames } from "@src/libs/util";

type Props = {
  children: React.ReactChild;
  hasHeader?: boolean;
  nonResposive?: boolean;
};

const Layout = ({
  children,
  hasHeader = true,
  nonResposive = false,
}: Props) => {
  return (
    <>
      {/* 상단 네비게이션 */}
      {hasHeader && <Header />}
      {/* 메인 컨텐츠 */}
      <main
        className={combineClassNames(
          "w-full mx-auto dark:text-white",
          nonResposive
            ? ""
            : "px-4 sm:max-w-[540px] md:max-w-[868px] lg:max-w-[940px] xl:max-w-[1100px] 2xl:max-w-[1400px]"
        )}
      >
        {children}
      </main>
      {/* 하단 footer */}
      {/* <footer className="max-w-xl w-full mx-auto">footer</footer> */}

      {/* >>> 임시 하단 margin 처리 */}
      <div className="mb-[10vh]"></div>
    </>
  );
};

export default Layout;
