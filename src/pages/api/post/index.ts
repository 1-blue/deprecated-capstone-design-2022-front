import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      return res.status(200).json({ ok: true, message: "SAdsas" });
    case "POST":
      const { title, keywords, contents, tempPostIdx } = req.body;

      console.log(title, keywords, contents, tempPostIdx);
      console.log("대충 게시글 생성 + 2초 대기");

      await new Promise((reject, resolve) => {
        setTimeout(() => {
          reject("1");
        }, 2000);
      });

      return res.status(200).json({ ok: true, title });

    default:
      return res.status(200).json({ ok: true, message: "게시글... 아무것도" });
  }
}
