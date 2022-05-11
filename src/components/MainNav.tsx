import Link from "next/link";
import { useRouter } from "next/router";

// common-component
import Icon from "@src/components/common/Icon";

// type
import { ICON } from "@src/types";

const MainNav = () => {
  const { asPath } = useRouter();

  return (
    <ul className="flex space-x-4">
      <li
        className={
          asPath === "/" ? "border-b-2 border-black dark:border-white" : ""
        }
      >
        <Link href="/">
          <a className="flex space-x-2">
            <Icon icon={ICON.TRENDING_UP} className="w-6 h-6" />
            <span>트렌딩</span>
          </a>
        </Link>
      </li>
      <li
        className={
          asPath === "/recent"
            ? "border-b-2 border-black dark:border-white"
            : ""
        }
      >
        <Link href="/recent">
          <a className="flex space-x-2">
            <Icon icon={ICON.CLOCK} className="w-6 h-6" />
            <span>최신</span>
          </a>
        </Link>
      </li>
      <li className="flex-1 text-right" />
      <li>
        <button type="button">
          <Icon icon={ICON.DOT_VERTICAL} />
        </button>
      </li>
    </ul>
  );
};

export default MainNav;
