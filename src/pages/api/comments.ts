import prisma from "@src/prisma";

// type
import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiGetCommentsResponse } from "@src/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiGetCommentsResponse>
) {
  const { method } = req;

  if (method === "GET") {
    const { query } = req;
    if (
      typeof query.postIdx !== "string" ||
      typeof query.lastIdx !== "string" ||
      typeof query.limit !== "string"
    )
      return res
        .status(418)
        .json({ comments: [], message: "잘못된 데이터를 전달받았습니다." });

    const postIdx = +req.query.postIdx;
    const lastIdx = +req.query.lastIdx;
    const limit = +req.query.limit;

    const exPost = await prisma.post.findUnique({ where: { idx: postIdx } });

    if (!exPost)
      return res
        .status(404)
        .json({ comments: [], message: "게시글이 존재하지 않습니다." });

    const comments = await prisma.comment.findMany({
      where: { postIdx },
      include: {
        User: {
          select: {
            idx: true,
            name: true,
            photo: true,
          },
        },
        replys: {
          include: {
            User: {
              select: {
                idx: true,
                name: true,
                photo: true,
              },
            },
          },
        },
      },
      take: limit,
      skip: lastIdx === -1 ? 0 : 1,
      ...(lastIdx !== -1 && { cursor: { idx: lastIdx } }),
    });

    return res
      .status(200)
      .json({ comments, message: "댓글들을 가져왔습니다." });
  }

  return res.status(400).json({ comments: [], message: "잘못된 요청입니다." });
}
