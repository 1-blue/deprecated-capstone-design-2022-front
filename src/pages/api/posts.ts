// type
import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiGetPostsResponse, PostKinds } from "@src/types";
import prisma from "@src/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiGetPostsResponse>
) {
  const kinds = req.query.kinds as PostKinds;
  const limit = Number(req.query.limit);
  const lastIdx = Number(req.query.lastIdx);

  let where = {};

  // >>> 좋아요 개수에 따른 정렬 적용 필요!
  if (kinds === "popular") {
    const posts = await prisma.post.findMany({
      where,
      include: {
        User: {
          select: {
            name: true,
            photo: true,
          },
        },
      },
      take: limit,
      skip: lastIdx === -1 ? 0 : 1,
      ...(lastIdx !== -1 && { cursor: { idx: lastIdx } }),
      // orderBy: { updatedAt: "desc" },
    });

    res.status(200).json({
      posts,
      message: "인기 게시글들을 " + limit + "개 가져왔습니다.",
    });
  }
  if (kinds === "recent") {
    const posts = await prisma.post.findMany({
      where,
      include: {
        User: {
          select: {
            name: true,
            photo: true,
          },
        },
      },
      take: limit,
      skip: lastIdx === -1 ? 0 : 1,
      ...(lastIdx !== -1 && { cursor: { idx: lastIdx } }),
      orderBy: { updatedAt: "desc" },
    });

    res.status(200).json({
      posts,
      message: "최근 게시글들을 " + limit + "개 가져왔습니다.",
    });
  }
}
