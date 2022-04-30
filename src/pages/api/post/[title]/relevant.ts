import type { NextApiRequest, NextApiResponse } from "next";

// dummy-data
import {
  getCategorizedPosts,
  getDummyPost,
  getRelevantPosts,
} from "@src/libs/dummy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      const { title } = req.query;

      console.log("게시글의 연관 게시글들 >> ", title);

      return res.status(200).json({
        ok: true,
        posts: getRelevantPosts(),
      });
    case "POST":
      return res.status(200).json({ ok: true });

    default:
      return res
        .status(400)
        .json({ ok: true, message: "/api/post 잘못된 요청" });
  }
}
