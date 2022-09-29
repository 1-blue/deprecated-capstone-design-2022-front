import { getSession } from "next-auth/react";

import prisma from "@src/prisma";

// type
import type { NextApiRequest, NextApiResponse } from "next";
import type {
  ApiCreatePostResponse,
  ApiDeletePostResponse,
  ApiGetPostResponse,
} from "@src/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    ApiGetPostResponse | ApiCreatePostResponse | ApiDeletePostResponse
  >
) {
  const { method } = req;

  try {
    if (method === "GET") {
      const { title, name } = req.query;

      if (typeof name !== "string" || typeof title !== "string") {
        return res
          .status(418)
          .json({ message: "잘못된 데이터를 전송받았습니다." });
      }

      const post = await prisma.post.findFirst({
        where: {
          title,
          User: { name },
          NOT: { OR: [{ isTemporary: true }, { isPrivate: true }] },
        },
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
    if (method === "POST") {
      const session = await getSession({ req });

      if (!session)
        return res.status(403).json({ message: "로그인후에 접근해주세요!" });

      const {
        title,
        contents,
        keywords,
        photo,
        category,
        isPrivate,
        summary,
        temporaryPostIdx,
      } = req.body;

      if (!Array.isArray(keywords))
        return res.status(418).json({ message: "잘못된 데이터입니다." });

      let postIdx = -1;

      if (temporaryPostIdx) {
        const updatedPost = await prisma.post.update({
          where: { idx: temporaryPostIdx },
          data: {
            title,
            contents,
            photo,
            summary,
            isPrivate,
            isTemporary: false,
            userIdx: session.user.idx,
            cateogoryIdx: category || null,
          },
        });

        postIdx = updatedPost.idx;
      } else {
        const createdPost = await prisma.post.create({
          data: {
            title,
            contents,
            photo,
            summary,
            isPrivate,
            isTemporary: false,
            userIdx: session.user.idx,
            cateogoryIdx: category || null,
          },
        });

        postIdx = createdPost.idx;
      }

      await prisma.keyword.createMany({
        data: keywords.map((keyword) => ({
          keyword: keyword.toLocaleLowerCase(),
        })),
        skipDuplicates: true,
      });

      await prisma.post.update({
        where: { idx: postIdx },
        data: {
          keywords: {
            createMany: {
              data: keywords.map((keyword) => ({ keywordIdx: keyword })),
              skipDuplicates: true,
            },
          },
        },
      });

      return res.status(201).json({ message: "게시글을 생성했습니다." });
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
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "서버측 오류입니다." });
  }

  return res.status(404).json({ message: "잘못된 접근입니다." });
}
