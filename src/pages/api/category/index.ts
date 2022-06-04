import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("로그인한 유저의 카테고리 요청");

  return res.status(200).json({
    status: { ok: true },
    data: {
      categorys: [
        {
          category: "React.js",
          _count: {
            post: 12,
          },
        },
        {
          category: "Vue.js",
          _count: {
            post: 21,
          },
        },
        {
          category: "Node.js",
          _count: {
            post: 5,
          },
        },
        {
          category: "Docker",
          _count: {
            post: 9,
          },
        },
        {
          category: "JavaScript",
          _count: {
            post: 11,
          },
        },
        {
          category: "TypeScript",
          _count: {
            post: 19,
          },
        },
        {
          category: "Next.js",
          _count: {
            post: 31,
          },
        },
        {
          category: "HTML",
          _count: {
            post: 2,
          },
        },
        {
          category: "CSS",
          _count: {
            post: 6,
          },
        },
      ],
    },
  });
}
