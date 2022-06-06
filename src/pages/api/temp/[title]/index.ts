import { getTempPosts } from "@src/libs/dummy";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "DELETE":
      console.log("임시 게시글 제거 ( 1.5초 대기 )");

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, 1500);
      });

      return res.status(200).json({ status: { ok: true } });

    default:
      return res.status(200).json({ ok: true, message: "게시글... 아무것도" });
  }
}
