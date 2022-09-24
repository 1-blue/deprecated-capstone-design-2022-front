import prisma from "@src/prisma";
import { getSession } from "next-auth/react";

// type
import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiCreateCommentResponse } from "@src/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiCreateCommentResponse>
) {
  const { method } = req;
  const session = await getSession({ req });

  if (!session)
    return res.status(403).json({ message: "로그인후에 접근해주세요!" });

  if (method === "POST") {
    const { postIdx, commentIdx, contents } = req.body;
    if (
      typeof postIdx !== "number" ||
      typeof commentIdx !== "number" ||
      typeof contents !== "string"
    )
      return res.status(418).json({ message: "잘못된 데이터를 받았습니다." });

    const exComment = await prisma.comment.findUnique({
      where: { idx: commentIdx },
    });

    if (!exComment)
      return res.status(404).json({ message: "존재하지 않는 댓글입니다." });

    await prisma.comment.create({
      data: { contents, postIdx, userIdx: session.user.idx, commentIdx },
    });

    return res.status(200).json({ message: "답글을 생성했습니다." });
  }
  if (method === "DELETE") {
    if (typeof req.query.replyIdx !== "string")
      return res.status(418).json({ message: "잘못된 데이터를 받았습니다." });

    const replyIdx = +req.query.replyIdx;

    const exReply = await prisma.comment.findUnique({
      where: { idx: replyIdx },
    });

    if (!exReply)
      return res.status(404).json({ message: "존재하지 않는 답글입니다." });

    const deletedReply = await prisma.comment.delete({
      where: { idx: replyIdx },
    });

    if (deletedReply) {
      return res.status(200).json({ message: "댓글을 제거했습니다." });
    } else {
      return res.status(500).json({ message: "댓글 제거에 실패했습니다." });
    }
  }

  return res.status(400).json({ message: "잘못된 접근입니다." });
}
