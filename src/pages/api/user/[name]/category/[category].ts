import type { NextApiRequest, NextApiResponse } from "next";

import { getDummyPosts } from "@src/libs/dummy";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      console.log("특정 유저의 카테고리 요청");

      return res.status(200).json({
        ok: true,
        posts: getDummyPosts("popular", 0),
      });

    default:
      break;
  }
}
