import prisma from "@src/prisma";

// type
import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiGetPostsOfUserAndCategoryResponse } from "@src/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    ApiGetPostsOfUserAndCategoryResponse | { message: string }
  >
) {
  const { method } = req;

  try {
    if (method === "GET") {
      if (
        typeof req.query.userIdx !== "string" ||
        typeof req.query.category !== "string"
      )
        return res.status(418).json({ message: "잘못된 데이터입니다." });

      const targetUserIdx = +req.query.userIdx;
      const category = req.query.category;

      const user = await prisma.user.findUnique({
        where: { idx: targetUserIdx },
      });

      if (!user)
        return res.status(404).json({ message: "유저가 존재하지 않습니다." });

      const posts = await prisma.post.findMany({
        where: { userIdx: targetUserIdx, cateogoryIdx: category },
        select: {
          idx: true,
          title: true,
          summary: true,
          photo: true,
          updatedAt: true,
          _count: { select: { comments: true, favorites: true } },
        },
      });

      return res.status(200).json({
        posts,
        message: "특정 유저의 특정 카테고리의 게시들을 가져왔습니다.",
      });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "서버측 오류입니다." });
  }

  return res.status(404).json({ message: "잘못된 접근입니다." });
}
