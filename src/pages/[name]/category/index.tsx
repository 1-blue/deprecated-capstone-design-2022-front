import useSWR from "swr";
import Link from "next/link";

// api
import apiService from "@src/api";

// component
import Photo from "@src/components/common/Photo";
import ProfileNav from "@src/components/ProfileNav";

// type
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import type {
  ApiGetPostsOfUserWithCategoryResponse,
  ApiGetUserResponse,
} from "@src/types";

type Props = {
  user: ApiGetUserResponse["user"];
};

const Category: NextPage<Props> = ({ user }) => {
  const { data: responseOfCategorys } =
    useSWR<ApiGetPostsOfUserWithCategoryResponse>(
      `/api/user/categories?userIdx=${user.idx}`
    );

  return (
    <>
      <ProfileNav
        avatar={user.photo}
        name={user.name}
        introduction={user.introduction}
      />

      <ul className="md:mx-auto md:w-3/5 my-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {responseOfCategorys?.categories.map(({ category, posts, _count }) => (
          <li key={category}>
            <Link href={`/${user.name}/category/${category}`}>
              <a className="group space-y-1">
                <Photo
                  photo={posts.find((post) => post.photo)?.photo}
                  className="w-full pt-[50%]"
                  $cover
                  $scale
                />
                <h3 className="font-bold">{category}</h3>
                <h3 className="text-sm">{_count.posts}개의 포스트</h3>
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
  if (!context.params) return { props: { user: null } };
  if (typeof context.params.name !== "string") return { props: { user: null } };

  try {
    const {
      data: { user },
    } = await apiService.userService.apiGetUser({
      name: context.params.name,
    });

    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  } catch (error) {
    console.error("/category/index.tsx getServerSideProps >> ", error);
  }

  return { props: { user: null } };
};

export default Category;
