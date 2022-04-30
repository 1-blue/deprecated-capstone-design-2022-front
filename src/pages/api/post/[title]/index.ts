import type { NextApiRequest, NextApiResponse } from "next";

// dummy-data
import { getDummyPost } from "@src/libs/dummy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      const { title } = req.query;

      console.log("특정 게시글 상세 정보 요청 >> ", title);

      return res.status(200).json({
        ok: true,
        post: getDummyPost(),
      });
    case "POST":
      return res.status(200).json({ ok: true });

    default:
      return res
        .status(400)
        .json({ ok: true, message: "/api/post 잘못된 요청" });
  }
}
