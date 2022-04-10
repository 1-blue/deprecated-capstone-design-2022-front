import type { NextPage } from "next";

// component
import MainNav from "@src/components/MainNav";

const Home: NextPage = () => {
  return (
    <>
      {/* 최신 게시글과 인기 게시글 네비게이터 */}
      <article>
        <MainNav />
      </article>

      <article>최신 게시글 페이지</article>
    </>
  );
};

export default Home;
