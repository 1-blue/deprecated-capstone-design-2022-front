import { getSession } from "next-auth/react";

import prisma from "@src/prisma";

// type
import type {
  ApiDeletePostResponse,
  ApiGetPostByUpdateResponse,
  ApiGetPostResponse,
} from "@src/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    ApiGetPostResponse | ApiDeletePostResponse | ApiGetPostByUpdateResponse
  >
) {
  const { method } = req;

  const session = await getSession({ req });

  if (!session)
    return res.status(403).json({ message: "로그인후에 접근해주세요!" });

  const userIdx = session.user.idx;

  if (method === "GET") {
    if (typeof req.query.title !== "string")
      return res.status(418).json({ message: "잘못된 데이터입니다." });

    const { title } = req.query;

    const exPost = await prisma.post.findFirst({
      where: { title, userIdx },
      include: {
        keywords: { select: { keyword: true } },
        Category: { select: { category: true } },
      },
    });

    if (!exPost)
      return res.status(404).json({ message: "존재하지 않는 게시글입니다." });

    return res
      .status(200)
      .json({ post: exPost, message: "게시글의 정보를 가져왔습니다." });
  }
  if (method === "POST") {
    const { title, keywords, ...rest } = req.body;

    if (!Array.isArray(keywords))
      return res.status(418).json({ message: "잘못된 데이터입니다." });

    // >>> promise 병렬 처리 필요
    const exPost = await prisma.post.findFirst({ where: { title, userIdx } });
    await prisma.keyword.createMany({
      data: keywords.map((keyword) => ({ keyword })),
      skipDuplicates: true,
    });

    // >>> 기존에 등록된 키워드와 비교해서 제거하는 로직도 필요
    if (exPost) {
      await prisma.post.update({
        where: { idx: exPost.idx },
        data: {
          title,
          keywords: {
            createMany: {
              data: keywords.map((keyword) => ({ keywordIdx: keyword })),
              skipDuplicates: true,
            },
          },
          userIdx,
          ...rest,
        },
      });
    } else {
      await prisma.post.create({
        data: {
          isTemporary: true,
          title,
          keywords: {
            createMany: {
              data: keywords.map((keyword) => ({ keywordIdx: keyword })),
              skipDuplicates: true,
            },
          },
          userIdx,
          ...rest,
        },
      });
    }

    return res
      .status(201)
      .json({ message: "현재 게시글을 임시 저장했습니다." });
  }

  return res.status(400).json({ message: "잘못된 접근입니다." });
}
