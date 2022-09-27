import { getSession } from "next-auth/react";

import prisma from "@src/prisma";

// type
import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiGetPostsOfTemporaryResponse } from "@src/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiGetPostsOfTemporaryResponse | { message: string }>
) {
  const session = await getSession({ req });

  if (!session)
    return res.status(403).json({ message: "로그인후에 접근해주세요!" });

  const userIdx = session.user.idx;

  try {
    if (req.method === "GET") {
      const posts = await prisma.post.findMany({
        where: { userIdx, NOT: { isPrivate: true }, isTemporary: true },
        select: {
          idx: true,
          title: true,
          contents: true,
          updatedAt: true,
        },
        orderBy: { updatedAt: "desc" },
      });

      return res
        .status(200)
        .json({ posts, message: "임시 게시글들을 가져왔습니다." });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "서버측 오류입니다." });
  }

  return res.status(404).json({ message: "잘못된 접근입니다." });
}
