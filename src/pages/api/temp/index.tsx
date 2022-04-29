import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "POST":
      const { title, keywords, contents, tempPostIdx } = req.body;

      console.log(title, keywords, contents, tempPostIdx);
      console.log("대충 임시 게시글 생성");

      return res.status(200).json({ ok: true, title, tempPostIdx: -1 });

    default:
      return res.status(200).json({ ok: true, message: "게시글... 아무것도" });
  }
}
