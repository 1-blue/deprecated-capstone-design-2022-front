import bcrypt from "bcrypt";

import prisma from "@src/prisma";

// type
import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiSignUpResponse } from "@src/types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiSignUpResponse>
) {
  const { body } = req;

  try {
    let data = null;
    const hashPassword = await bcrypt.hash(body.password, 6);

    if (body.photo) {
      const photo = body.photo as string;

      data = {
        ...body,
        password: hashPassword,
        photo,
      };
    } else {
      data = {
        ...body,
        password: hashPassword,
        photo: undefined,
      };
    }

    await prisma.user.create({ data });

    return res.status(200).json({
      message: "회원가입에 성공했습니다. 로그인 페이지로 이동합니다.",
    });
  } catch (error) {
    console.error("/api/signup >> ", error);

    // 아이디 겹친다면 실행
    if (error instanceof PrismaClientKnownRequestError) {
      const errorType = error.meta?.target;

      switch (errorType) {
        case "User_id_key":
          return res.status(409).json({
            message: "이미 사용중인 아이디입니다.",
          });
      }
    }

    return res.status(409).json({
      message: "알 수 없는 에러입니다. 잠시후에 다시 시도해주세요!",
    });
  }
}
