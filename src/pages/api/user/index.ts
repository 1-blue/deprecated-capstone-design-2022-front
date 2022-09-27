import { getSession } from "next-auth/react";

import prisma from "@src/prisma";
import { movePhoto } from "@src/libs";

// type
import type { NextApiRequest, NextApiResponse } from "next";
import type {
  ApiDeleteUserResponse,
  ApiGetUserResponse,
  ApiUpdateUserResponse,
} from "@src/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | ApiGetUserResponse
    | ApiUpdateUserResponse
    | ApiDeleteUserResponse
    | { message: string }
  >
) {
  const { method } = req;

  try {
    if (method === "GET") {
      if (typeof req.query.name !== "string")
        return res.status(418).json({ message: "잘못된 데이터입니다." });

      const user = await prisma.user.findFirst({
        where: { name: req.query.name },
        select: { idx: true, name: true, photo: true, introduction: true },
      });

      if (!user)
        return res.status(404).json({ message: "유저가 존재하지 않습니다." });

      return res
        .status(200)
        .json({ user, message: "특정 유저의 접근 가능한 정보입니다." });
    }
    if (method === "PATCH") {
      const session = await getSession({ req });

      if (!session)
        return res.status(403).json({ message: "로그인후에 접근해주세요!" });

      if (typeof req.body.userIdx !== "number")
        return res.status(418).json({ message: "잘못된 데이터입니다." });

      if (session.user.idx !== req.body.userIdx)
        return res.status(401).json({ message: "접근 권한이 없습니다." });

      const { userIdx, photo, ...rest } = req.body;

      const exUser = await prisma.user.findUnique({ where: { idx: userIdx } });

      if (!exUser)
        return res.status(404).json({ message: "유저가 존재하지 않습니다." });

      if (photo && exUser.photo) {
        await movePhoto(exUser.photo, "remove");
      }

      if (photo === "remove" && exUser.photo) {
        await movePhoto(exUser.photo, "remove");

        await prisma.user.update({
          where: { idx: userIdx },
          data: { ...rest, photo: null },
        });

        return res.status(200).json({ message: "유저의 정보를 수정했습니다." });
      }

      await prisma.user.update({
        where: { idx: userIdx },
        data: { ...rest, photo },
      });

      return res.status(200).json({ message: "유저의 정보를 수정했습니다." });
    }
    if (method === "DELETE") {
      const session = await getSession({ req });

      if (!session)
        return res.status(403).json({ message: "로그인후에 접근해주세요!" });

      await prisma.user.delete({ where: { idx: session.user.idx } });

      return res.status(200).json({ message: "회원탈퇴했습니다." });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "서버측 오류입니다." });
  }

  return res.status(404).json({ message: "잘못된 접근입니다." });
}
