import prisma from "@src/prisma";

// type
import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiGetPostsResponse, PostKinds } from "@src/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiGetPostsResponse>
) {
  const kinds = req.query.kinds as PostKinds;
  const limit = Number(req.query.limit);
  const lastIdx = Number(req.query.lastIdx);

  let where = {
    NOT: {
      OR: [{ isPrivate: true }, { isTemporary: true }],
    },
  };

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
        _count: {
          select: {
            comments: true,
            favorites: true,
          },
        },
      },
      take: limit,
      skip: lastIdx === -1 ? 0 : 1,
      ...(lastIdx !== -1 && { cursor: { idx: lastIdx } }),
      orderBy: [{ favorites: { _count: "desc" } }],
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
        _count: {
          select: {
            comments: true,
            favorites: true,
          },
        },
      },
      take: limit,
      skip: lastIdx === -1 ? 0 : 1,
      ...(lastIdx !== -1 && { cursor: { idx: lastIdx } }),
      orderBy: [{ updatedAt: "desc" }],
    });

    res.status(200).json({
      posts,
      message: "최근 게시글들을 " + limit + "개 가져왔습니다.",
    });
  }
}
