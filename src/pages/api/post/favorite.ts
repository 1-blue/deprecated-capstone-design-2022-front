import { getSession } from "next-auth/react";

import prisma from "@src/prisma";

// type
import type { NextApiRequest, NextApiResponse } from "next";
import type {
  ApiCreateFavoriteResponse,
  ApiDeleteFavoriteResponse,
} from "@src/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiCreateFavoriteResponse | ApiDeleteFavoriteResponse>
) {
  const { method } = req;

  if (typeof req.query.postIdx !== "string")
    return res.status(418).json({ message: "잘못된 데이터입니다." });

  const postIdx = +req.query.postIdx;

  try {
    const exPost = await prisma.post.findUnique({ where: { idx: postIdx } });

    if (!exPost)
      return res.status(404).json({ message: "게시글이 존재하지 않습니다." });

    const session = await getSession({ req });

    if (!session)
      return res.status(403).json({ message: "로그인후에 접근해주세요!" });

    const userIdx = session.user.idx;

    if (method === "POST") {
      await prisma.favorite.create({ data: { postIdx, userIdx } });

      return res.status(201).json({ message: "좋아요를 눌렀습니다." });
    }
    if (method === "DELETE") {
      await prisma.favorite.delete({
        where: { userIdx_postIdx: { postIdx, userIdx } },
      });

      return res.status(200).json({ message: "좋아요를 취소했습니다." });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "서버측 오류입니다." });
  }

  return res.status(404).json({ message: "잘못된 접근입니다." });
}
