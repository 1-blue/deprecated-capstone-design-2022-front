import prisma from "@src/prisma";

// type
import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiGetPostsOfUserWithCategoryResponse } from "@src/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    ApiGetPostsOfUserWithCategoryResponse | { message: string }
  >
) {
  const { method } = req;

  try {
    if (method === "GET") {
      if (typeof req.query.userIdx !== "string")
        return res.status(418).json({ message: "잘못된 데이터입니다." });

      const targetUserIdx = +req.query.userIdx;

      const user = await prisma.user.findUnique({
        where: { idx: targetUserIdx },
      });

      if (!user)
        return res.status(404).json({ message: "유저가 존재하지 않습니다." });

      const categories = await prisma.category.findMany({
        where: { categories: { some: { userIdx: targetUserIdx } } },
        select: {
          category: true,
          posts: { select: { photo: true } },
          _count: { select: { posts: true } },
        },
      });

      return res.status(200).json({
        categories,
        message: "특정 유저의 카테고리와 그 게시글들을 가져왔습니다.",
      });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "서버측 오류입니다." });
  }

  return res.status(404).json({ message: "잘못된 접근입니다." });
}
