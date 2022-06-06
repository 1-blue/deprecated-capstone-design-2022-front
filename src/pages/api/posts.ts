import type { NextApiRequest, NextApiResponse } from "next";

import { getDummyPosts } from "@src/libs/dummy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const kinds = req.query.kinds as string;
  const offset = req.query.offset as string;
  const keyword = req.query.keyword as string;
  const page = +(req.query.page as string);
  const username = req.query.username as string;
  const category = req.query.category as string;

  console.log(page, offset, kinds, keyword, username, category);

  if (keyword) {
    console.log("검색 요청... 1.5초 대기");

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(1);
      }, 1500)
    );
  }

  let posts;

  if (keyword) posts = getDummyPosts(kinds, page, keyword);
  else if (username) posts = getDummyPosts(kinds, page);
  else if (category) posts = getDummyPosts("popular", 0);
  else posts = getDummyPosts(kinds, page);

  res.status(200).json({
    status: { ok: true },
    data: { posts },
  });
}
