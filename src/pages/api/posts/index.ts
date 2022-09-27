import prisma from "@src/prisma";

// type
import type { NextApiRequest, NextApiResponse } from "next";
import type {
  ApiGetPostsOfFavoriteResponse,
  ApiGetPostsOfUserResponse,
  ApiGetPostsResponse,
  PostKinds,
} from "@src/types";
import { getSession } from "next-auth/react";
import { ApiGetPostsOfSearchResponse } from "@src/types/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | ApiGetPostsResponse
    | ApiGetPostsOfUserResponse
    | ApiGetPostsOfFavoriteResponse
    | ApiGetPostsOfSearchResponse
    | { message: string }
  >
) {
  const kinds = req.query.kinds as PostKinds;
  const limit = Number(req.query.limit);
  const lastIdx = Number(req.query.lastIdx);

  try {
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

      return res.status(200).json({
        posts,
        message: "인기 게시글들을 " + posts.length + "개 가져왔습니다.",
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

      return res.status(200).json({
        posts,
        message: "최근 게시글들을 " + posts.length + "개 가져왔습니다.",
      });
    }
    if (kinds === "favorite") {
      const session = await getSession({ req });

      if (!session)
        return res.status(403).json({ message: "로그인후에 접근해주세요!" });

      const userIdx = session.user.idx;

      const posts = await prisma.post.findMany({
        where: { favorites: { some: { userIdx } } },
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
      });

      return res
        .status(200)
        .json({ posts, message: "좋아요 누른 게시글들을 가져왔습니다." });
    }
    if (kinds === "search") {
      if (
        typeof req.query.lastIdx !== "string" ||
        typeof req.query.limit !== "string" ||
        typeof req.query.keyword !== "string"
      ) {
        return res.status(418).json({ message: "잘못된 데이터입니다." });
      }

      const { keyword } = req.query;
      const lastIdx = +req.query.lastIdx;
      const limit = +req.query.limit;

      const posts = await prisma.post.findMany({
        where: {
          ...where,
          keywords: { some: { keyword: { keyword: { contains: keyword } } } },
        },
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
          keywords: { select: { keyword: true } },
        },
        take: limit,
        skip: lastIdx === -1 ? 0 : 1,
        ...(lastIdx !== -1 && { cursor: { idx: lastIdx } }),
        orderBy: [{ favorites: { _count: "desc" } }],
      });

      return res.status(200).json({
        posts,
        message: `"${keyword}"를 키워드로 가진 게시글들입니다.`,
      });
    }
    if (typeof req.query.username === "string") {
      // 특정 유저의 게시글들 요청
      const posts = await prisma.post.findMany({
        where: { ...where, User: { name: req.query.username } },
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
          keywords: { select: { keyword: true } },
        },
        take: limit,
        skip: lastIdx === -1 ? 0 : 1,
        ...(lastIdx !== -1 && { cursor: { idx: lastIdx } }),
        orderBy: [{ updatedAt: "desc" }],
      });

      return res.status(200).json({
        posts,
        message:
          req.query.username +
          "님의 게시글들을 " +
          posts.length +
          "개 가져왔습니다.",
      });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "서버측 오류입니다." });
  }

  return res.status(404).json({ message: "잘못된 접근입니다." });
}
