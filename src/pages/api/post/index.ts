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
      const { title } = req.body;

      console.log(req.body);

      console.log("대충 게시글 생성");

      return res.status(200).json({
        status: {
          ok: true,
        },
        data: { title },
      });

    default:
      return res.status(200).json({ ok: true, message: "게시글... 아무것도" });
  }
}
