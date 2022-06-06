import type { NextApiRequest, NextApiResponse } from "next";

import { getLikedPosts } from "@src/libs/dummy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res
    .status(200)
    .json({ status: { ok: true }, data: { posts: getLikedPosts() } });
}
