import prisma from "@src/prisma";

// type
import type { ApiDeletePostResponse, ApiGetPostResponse } from "@src/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiGetPostResponse | ApiDeletePostResponse>
) {
  const { method } = req;

  if (method === "GET") {
    const { title, name } = req.query;

    if (typeof name !== "string" || typeof title !== "string") {
      return res
        .status(418)
        .json({ message: "잘못된 데이터를 전송받았습니다." });
    }

    const post = await prisma.post.findFirst({
      where: { title, User: { name } },
      include: {
        User: {
          select: {
            idx: true,
            name: true,
            photo: true,
            introduction: true,
          },
        },
        keywords: { select: { keyword: true } },
        favorites: { select: { userIdx: true } },
        _count: { select: { comments: true } },
      },
    });

    if (!post)
      return res.status(404).json({ message: "게시글이 존재하지 않습니다." });

    return res
      .status(200)
      .json({ post, message: "특정 게시글을 가져왔습니다." });
  }
  if (method === "DELETE") {
    if (typeof req.query.postIdx !== "string")
      return res.status(418).json({ message: "잘못된 데이터를 받았습니다." });

    const postIdx = +req.query.postIdx;

    const deletedPost = await prisma.post.delete({ where: { idx: postIdx } });

    if (deletedPost) {
      return res.status(200).json({
        message: "게시글을 삭제했습니다. \n메인 페이지로 이동됩니다.",
      });
    } else {
      return res.status(500).json({
        message: "게시글 삭제에 실패했습니다. \n다시 시도해주세요!",
      });
    }
  }

  return res.status(400).json({ message: "잘못된 접근입니다." });
}
