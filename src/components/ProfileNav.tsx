import { useRouter } from "next/router";
import Link from "next/link";

// common-component
import Avatar from "@src/components/common/Avatar";

// util
import { combineClassNames } from "@src/libs/util";

type Props = {
  avatar: string | null | undefined;
  name: string;
  introduction: string | null;
};

const ProfileNav = ({ avatar, name, introduction }: Props) => {
  const router = useRouter();

  return (
    <>
      <section className="md:mx-auto md:w-3/5 flex items-center space-x-4">
        <Avatar photo={avatar} className="w-20 h-20 md:w-28 md:h-28" />
        <div className="flex flex-col space-y-2">
          <span className="font-bold text-xl md:text-2xl">{name}</span>
          <p className="whitespace-pre-line text-sm md:text-base">
            {introduction}
          </p>
        </div>
      </section>

      <hr className="md:mx-auto md:w-3/5 my-8" />

      <ul className="md:mx-auto md:w-3/5 flex justify-between mx-auto space-x-2">
        <Link href={`/${name}`}>
          <a
            className={combineClassNames(
              "flex-1 text-center text-lg font-semibold",
              router.pathname === "/[name]"
                ? "border-b-2 border-indigo-400 text-indigo-400"
                : ""
            )}
          >
            글
          </a>
        </Link>
        <Link href={`/${name}/category`}>
          <a
            className={combineClassNames(
              "flex-1 text-center text-lg font-semibold",
              router.pathname.includes("/category")
                ? "border-b-2  border-indigo-400 text-indigo-400"
                : ""
            )}
          >
            카테고리
          </a>
        </Link>
        <Link href={`/${name}/introduction`}>
          <a
            className={combineClassNames(
              "flex-1 text-center text-lg font-semibold",
              router.pathname.includes("/introduction")
                ? "border-b-2  border-indigo-400 text-indigo-400"
                : ""
            )}
          >
            소개
          </a>
        </Link>
      </ul>
    </>
  );
};

export default ProfileNav;
