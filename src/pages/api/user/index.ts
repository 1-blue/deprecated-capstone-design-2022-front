import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      return res.status(200).json({});
    case "GET":
      return res.status(200).json({});
    case "PATCH":
      console.log("유저 정보 변경 ( 1초 대기 ) >> ", req.body);

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(1);
        }, 1000)
      );

      return res.status(200).json({ status: { ok: true } });
    case "DELETE":
      console.log("계정 삭제 ( 3초 대기 ) >> ");

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(1);
        }, 3000)
      );

      return res.status(200).json({ status: { ok: true } });
    default:
      break;
  }
}
