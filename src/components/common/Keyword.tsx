import { useRouter } from "next/router";

// type
import type { SimpleKeyword } from "@src/types";

type Props = {
  keywords: SimpleKeyword[];
};

const Keyword = ({ keywords }: Props) => {
  const router = useRouter();

  return (
    <ul className="flex flex-wrap space-x-2">
      {keywords.map(({ keyword }) => (
        <li
          key={keyword}
          className="bg-zinc-200 text-indigo-600 hover:bg-zinc-300 hover:text-indigo-700 dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:text-indigo-300 dark:hover:text-indigo-400 font-semibold py-2 px-4 mb-2 rounded-md cursor-pointer text-xs md:text-sm"
          onClick={() => router.push(`/search?keyword=${keyword}`)}
        >
          {keyword}
        </li>
      ))}
    </ul>
  );
};

export default Keyword;
