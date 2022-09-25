import prisma from "@src/prisma";

// type
import type { ApiGetPostsByCategoryResponse } from "@src/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiGetPostsByCategoryResponse>
) {
  const { method } = req;

  if (
    typeof req.query.postIdx !== "string" ||
    typeof req.query.userIdx !== "string"
  )
    return res.status(418).json({ posts: [], message: "잘못된 데이터입니다." });

  const postIdx = +req.query.postIdx;
  const userIdx = +req.query.userIdx;
  const exPost = await prisma.post.findUnique({
    where: { idx: postIdx },
    select: { cateogoryIdx: true },
  });

  if (!exPost)
    return res
      .status(404)
      .json({ posts: [], message: "게시글이 존재하지 않습니다." });

  if (method === "GET") {
    const posts = await prisma.post.findMany({
      where: { cateogoryIdx: exPost.cateogoryIdx, userIdx },
      select: { title: true },
    });

    return res.status(201).json({
      posts,
      message: "특정 카테고리를 가진 게시글들을 가져왔습니다.",
    });
  }

  return res.status(400).json({ posts: [], message: "잘못된 접근입니다." });
}
