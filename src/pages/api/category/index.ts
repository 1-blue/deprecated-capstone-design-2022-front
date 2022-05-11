import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("로그인한 유저의 카테고리 요청");

  return res.status(200).json({
    ok: true,
    categorys: [
      "React.js",
      "Vue.js",
      "Node.js",
      "Docker",
      "JavaScript",
      "TypeScript",
      "Next.js",
      "HTML",
      "CSS",
    ],
  });
}
