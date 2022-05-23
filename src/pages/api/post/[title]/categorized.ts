import type { NextApiRequest, NextApiResponse } from "next";

// dummy-data
import { getCategorizedPosts } from "@src/libs/dummy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      const { title } = req.query;

      console.log("같은 카테고리 게시글들 요청 >> ", title);

      return res.status(200).json({
        status: {
          ok: true,
        },
        data: {
          category: "React.js",
          posts: getCategorizedPosts(),
        },
      });
    case "POST":
      return res.status(200).json({ ok: true });

    default:
      return res
        .status(400)
        .json({ ok: true, message: "/api/post 잘못된 요청" });
  }
}
