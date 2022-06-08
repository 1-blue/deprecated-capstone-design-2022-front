import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "DELETE":
      console.log("임시 게시글 제거");

      return res.status(200).json({ status: { ok: true } });

    default:
      return res.status(200).json({ ok: true, message: "게시글... 아무것도" });
  }
}
