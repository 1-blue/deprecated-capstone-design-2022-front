import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.body.id as string;
  const password = req.body.password as string;

  console.log(id, password);

  res.status(200).json({
    status: {
      ok: true,
    },
  });
}
