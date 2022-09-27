import prisma from "@src/prisma";

// type
import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiGetPostByRelevantResponse, PostKinds } from "@src/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiGetPostByRelevantResponse | { message: string }>
) {
  if (typeof req.query.postIdx !== "string")
    return res.status(418).json({ message: "잘못된 데이터를 받았습니다." });

  const postIdx = +req.query.postIdx;
  const kinds = req.query.kinds as PostKinds;

  try {
    const targetPost = await prisma.post.findUnique({
      where: { idx: postIdx },
      include: { keywords: { select: { keyword: true } } },
    });

    if (!targetPost)
      return res.status(404).json({ message: "게시글이 존재하지 않습니다." });

    if (kinds === "relevant") {
      const keywords = targetPost.keywords.map(
        ({ keyword }) => keyword.keyword
      );

      const relenvantPosts = await prisma.post.findMany({
        where: {
          NOT: { idx: targetPost.idx },
          keywords: {
            some: { OR: keywords.map((keyword) => ({ keywordIdx: keyword })) },
          },
        },
        include: {
          User: { select: { name: true, photo: true } },
          _count: {
            select: {
              comments: true,
              favorites: true,
            },
          },
        },
        take: 20,
      });

      return res
        .status(200)
        .json({ relenvantPosts, message: "연관된 게시글들입니다." });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "서버측 오류입니다." });
  }

  return res.status(404).json({ message: "잘못된 접근입니다." });
}
