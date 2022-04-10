import { useRouter } from "next/router";

const PostDetail = () => {
  const router = useRouter();

  return (
    <>
      <h1>상세 게시글 페이지 - {router.query.title}</h1>
    </>
  );
};

export default PostDetail;
