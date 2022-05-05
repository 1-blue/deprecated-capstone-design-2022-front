import type { NextApiRequest, NextApiResponse } from "next";

// dummy-data
import { getDummyPost } from "@src/libs/dummy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { title } = req.query;

  switch (method) {
    case "GET":
      console.log("특정 게시글 상세 정보 요청 ( 2초 대기 ) >> ", title);

      await new Promise((reject, resolve) => {
        setTimeout(() => {
          reject("1");
        }, 2000);
      });

      return res.status(200).json({
        ok: true,
        post: getDummyPost(),
      });
    case "POST":
      return res.status(200).json({ ok: true });
    case "DELETE":
      console.log("특정 게시글 제거 요청 ( 2초 대기 ) >> ", title);

      await new Promise((reject, resolve) => {
        setTimeout(() => {
          reject("1");
        }, 2000);
      });

      return res.status(200).json({ ok: true, message: "게시글 제거 성공" });

    default:
      return res
        .status(400)
        .json({ ok: true, message: "/api/post 잘못된 요청" });
  }
}
