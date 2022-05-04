import { useEffect, useState } from "react";

// util
import { combineClassNames, getTitleList } from "@src/libs/util";

type PostTitle = {
  text: string;
  size: number;
};
type Props = {
  contents: string;
};

const TitleNav = ({ contents }: Props) => {
  // 2022/05/04 - 게시글 제목 목록 - by 1-blue
  const [titleList, setTitleList] = useState<PostTitle[] | null>(null);
  // 2022/05/04 - 게시글의 타이틀들을 텍스트와 크기로 분리 - by 1-blue
  useEffect(() => {
    setTitleList(getTitleList(contents));
  }, [setTitleList, contents]);

  return (
    <nav className="fixed top-[10%] right-[4%] hidden 2xl:flex flex-col space-y-1 pl-2 border-l border-gray-500 dark:border-gray-400">
      {titleList?.map(({ text, size }) => (
        <a
          href={`#${text}`}
          key={text}
          className={combineClassNames(
            "text-sm font-semibold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
            size === 1 ? `pl-[5px]` : "",
            size === 2 ? `pl-[10px]` : "",
            size === 3 ? `pl-[15px]` : "",
            size === 4 ? `pl-[20px]` : "",
            size === 5 ? `pl-[25px]` : ""
          )}
        >
          {text}
        </a>
      ))}
    </nav>
  );
};

export default TitleNav;
