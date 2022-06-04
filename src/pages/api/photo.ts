import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("이미지 파일 받고 -> 업로드 -> 업로드 url반환");

  await new Promise((reject, resolve) => {
    setTimeout(() => {
      reject("1");
    }, 2000);
  });

  return res.status(201).json({
    status: {
      ok: true,
    },
    data: {
      photoUrl:
        "https://blemarket.s3.ap-northeast-2.amazonaws.com/images/production/venice_1650792768710",
    },
  });
}
