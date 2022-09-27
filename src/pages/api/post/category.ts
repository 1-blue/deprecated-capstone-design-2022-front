import prisma from "@src/prisma";

// type
import type { ApiGetPostsByCategoryResponse } from "@src/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiGetPostsByCategoryResponse | { message: string }>
) {
  const { method } = req;

  if (
    typeof req.query.postIdx !== "string" ||
    typeof req.query.userIdx !== "string"
  )
    return res.status(418).json({ message: "잘못된 데이터입니다." });

  const postIdx = +req.query.postIdx;
  const userIdx = +req.query.userIdx;

  try {
    const exPost = await prisma.post.findUnique({
      where: { idx: postIdx },
      select: { cateogoryIdx: true },
    });

    if (!exPost)
      return res.status(404).json({ message: "게시글이 존재하지 않습니다." });

    if (method === "GET") {
      const posts = await prisma.post.findMany({
        where: {
          cateogoryIdx: exPost.cateogoryIdx,
          userIdx,
          NOT: {
            OR: [{ isPrivate: true }, { isTemporary: true }],
          },
        },
        select: { title: true },
      });

      return res.status(200).json({
        posts,
        message: "특정 카테고리를 가진 게시글들을 가져왔습니다.",
      });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "서버측 오류입니다." });
  }

  return res.status(404).json({ message: "잘못된 접근입니다." });
}
