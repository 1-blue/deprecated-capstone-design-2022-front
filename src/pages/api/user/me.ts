import type { NextApiRequest, NextApiResponse } from "next";

import { getMe } from "@src/libs/dummy";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({
    status: {
      ok: true,
    },
    data: {
      user: getMe(),
    },
  });
  // return res.status(200).json({ ok: true, user: null });
}
