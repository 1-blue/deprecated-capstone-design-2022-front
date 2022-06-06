import { SimplePost } from "@src/types";

export const getTemporaryPosts = () =>
  Array(20)
    .fill(null)
    .map((v, i) => ({
      id: i,
      title: "게시글 제목 - " + i,
      summary: "게시글을 패치중입니다..." + i,
      updatedAt: new Date(),
      user: {
        id: 1,
        name: "유저" + i,
      },
      keywords: [{ keyword: "React.js" }],
      _count: {
        comments: 0,
        favorite: 0,
      },
    }));
