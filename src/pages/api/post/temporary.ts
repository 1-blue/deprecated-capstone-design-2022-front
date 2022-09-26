import { getSession } from "next-auth/react";

import prisma from "@src/prisma";

// type
import type { NextApiRequest, NextApiResponse } from "next";
import type {
  ApiCreateTemporaryPostResponse,
  ApiGetPostByUpdateResponse,
} from "@src/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | ApiGetPostByUpdateResponse
    | ApiCreateTemporaryPostResponse
    | { message: string }
  >
) {
  const { method } = req;

  const session = await getSession({ req });

  if (!session)
    return res.status(403).json({ message: "로그인후에 접근해주세요!" });

  const userIdx = session.user.idx;

  try {
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

      // 임시 저장 게시글의 식별자
      let temporaryPostIdx = -1;

      // >>> 기존에 등록된 키워드와 비교해서 제거하는 로직도 필요
      if (exPost) {
        const post = await prisma.post.update({
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

        temporaryPostIdx = post.idx;
      } else {
        const post = await prisma.post.create({
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

        temporaryPostIdx = post.idx;
      }

      return res
        .status(201)
        .json({
          temporaryPostIdx,
          message: "현재 게시글을 임시 저장했습니다.",
        });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "서버측 오류입니다." });
  }

  return res.status(404).json({ message: "잘못된 접근입니다." });
}
