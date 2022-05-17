import type { NextApiRequest, NextApiResponse } from "next";

import { getDummyPosts } from "@src/libs/dummy";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const kinds = req.query.kinds as string;
  const offset = req.query.offset as string;
  const page = +(req.query.page as string);

  switch (method) {
    case "GET":
      console.log("특정 유저의 게시글들 요청 >> ", req.query);

      return res
        .status(200)
        .json({ ok: true, posts: getDummyPosts(kinds, page) });

    default:
      break;
  }
}
