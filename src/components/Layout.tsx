// component
import Header from "@src/components/Header";

type Props = {
  children: React.ReactChild;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      {/* 상단 네비게이션 */}
      <Header />
      {/* 메인 컨텐츠 */}
      <main className="w-full mx-auto space-y-4 px-4 dark:text-white lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1536px]">
        {children}
      </main>
      {/* 하단 footer */}
      <footer className="max-w-xl w-full mx-auto">footer</footer>
    </>
  );
};

export default Layout;
