import type { NextApiRequest, NextApiResponse } from "next";

// type
import { ApiResponseOfPosts } from "@src/types";
import { getDummyPosts } from "@src/libs/dummy";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseOfPosts>
) {
  res.status(200).json({ ok: true, posts: getDummyPosts() });
}
