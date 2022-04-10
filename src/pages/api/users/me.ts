import type { NextApiRequest, NextApiResponse } from "next";

// type
import { ApiResponseOfMe } from "@src/types";
import { getMe } from "@src/libs/dummy";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseOfMe>
) {
  res.status(200).json({ ok: true, user: getMe() });
}
