import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.body.id as string;
  const password = req.body.password as string;
  const name = req.body.name as string;
  const introduction = req.body.introduction as string;
  const avatar = req.body.avatar as string;

  console.log(id, password, name, introduction, avatar);

  res.status(200).json({
    status: {
      ok: true,
    },
  });
}
