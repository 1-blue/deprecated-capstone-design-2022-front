// component
import Header from "@src/components/Header";
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
      <Header hasHeader={hasHeader} />
      {/* 메인 컨텐츠 */}
      <main
        className={combineClassNames(
          "w-full mx-auto space-y-4 dark:text-white",
          nonResposive
            ? ""
            : "px-4 sm:max-w-[540px] md:max-w-[868px] lg:max-w-[940px] xl:max-w-[1100px] 2xl:max-w-[1400px]"
        )}
      >
        {children}
      </main>
      {/* 하단 footer */}
      {/* <footer className="max-w-xl w-full mx-auto">footer</footer> */}
    </>
  );
};

export default Layout;
