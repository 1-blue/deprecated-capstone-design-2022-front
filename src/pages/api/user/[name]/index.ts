import type { NextApiRequest, NextApiResponse } from "next";

import { getMe } from "@src/libs/dummy";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      console.log(req.query.name, " 유저 정보 요청");

      return res.status(200).json({ ok: true, user: getMe() });

    default:
      break;
  }
}
