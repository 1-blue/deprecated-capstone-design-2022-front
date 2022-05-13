import type { NextPage } from "next";
import useSWR from "swr";

// component
import Post from "@src/components/Post";

// type
import type { IPostWithUserAndCount } from "@src/types";

type ResponseOfLikedPosts = {
  ok: boolean;
  posts: IPostWithUserAndCount[];
};

const Liked: NextPage = () => {
  const { data: likedPosts } = useSWR<ResponseOfLikedPosts>("/api/lists/liked");

  return (
    <>
      <h1 className="mb-4 font-bold text-2xl">좋아요를 누른 게시글들</h1>

      <ul className="grid gird-col-1 gap-x-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {likedPosts?.posts.map((post, i) => (
          <Post
            key={post.idx}
            post={post}
            photoSize="w-full h-[200px]"
            $priority={i < 4}
          />
        ))}
      </ul>
    </>
  );
};

export default Liked;
