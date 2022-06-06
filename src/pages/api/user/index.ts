import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      return res.status(200).json({});

    case "PATCH":
      console.log("유저 정보 변경 >> ", req.body);

      return res.status(200).json({ status: { ok: true } });
    case "DELETE":
      console.log("계정 삭제 >> ");

      return res.status(200).json({ status: { ok: true } });
    default:
      break;
  }
}
