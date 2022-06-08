import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "DELETE":
      console.log("댓글 제거 요청 >> ", req.query);

      return res.status(200).json({ ok: true, message: "댓글 제거 완료" });

    default:
      return res.status(400).json({ ok: true, message: "잘못된 요청" });
  }
}
