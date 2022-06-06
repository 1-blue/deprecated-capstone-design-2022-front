import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import useSWR from "swr";

// component
import ProfileNav from "@src/components/ProfileNav";

// type
import type {
  ICategoryWithCount,
  ResponseStatus,
  SimpleUser,
} from "@src/types";
import Link from "next/link";

type Props = {
  user: SimpleUser;
};
type ResponseOfCategorys = {
  status: ResponseStatus;
  data: {
    categorys: ICategoryWithCount[];
  };
};

const Category: NextPage<Props> = ({ user }) => {
  const { data: responseOfCategorys } =
    useSWR<ResponseOfCategorys>(`/api/category`);

  return (
    <>
      <ProfileNav avatar={user.avatar} name={user.name} />

      <ul className="md:mx-auto md:w-3/5 my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {responseOfCategorys?.data.categorys.map(({ category, _count }) => (
          <li key={category}>
            <Link href={`/${user.name}/category/${category}`}>
              <a className="space-y-1">
                <div className="w-full pt-[70%] bg-gray-300 dark:bg-gray-400" />
                <h3 className="font-bold">{category}</h3>
                <h3 className="text-sm">{_count.post}개의 포스트</h3>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${context.params?.name}`
  ).then((res) => res.json());

  return {
    props: {
      user: response?.data.user,
    },
  };
};

export default Category;
