import { getSession } from "next-auth/react";

import prisma from "@src/prisma";

// type
import type { NextApiRequest, NextApiResponse } from "next";
import type {
  ApiCreateCategoryResponse,
  ApiGetCategoriesResponse,
} from "@src/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiGetCategoriesResponse | ApiCreateCategoryResponse>
) {
  const { method } = req;
  const session = await getSession({ req });

  if (!session)
    return res.status(403).json({ message: "로그인후에 접근해주세요!" });

  const userIdx = session.user.idx;

  if (method === "GET") {
    const categories = await prisma.category.findMany({
      where: {
        categories: {
          some: {
            userIdx,
          },
        },
      },
    });

    return res
      .status(200)
      .json({ categories, message: "모든 카테고리들을 가져왔습니다." });
  }
  if (method === "POST") {
    if (typeof req.body.category !== "string")
      return res.status(418).json({ message: "잘못된 데이터입니다." });

    const { category } = req.body;

    try {
      await prisma.category.create({
        data: {
          category,
          categories: {
            connectOrCreate: {
              where: {
                userIdx_categoryIdx: { categoryIdx: category, userIdx },
              },
              create: { userIdx },
            },
          },
        },
      });

      return res
        .status(201)
        .json({ message: "새로운 카테고리를 생성했습니다." });
    } catch (error) {
      console.error(error);
    }
  }
}
