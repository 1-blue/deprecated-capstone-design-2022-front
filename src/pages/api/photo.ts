// util
import { getSignedURL, movePhoto } from "@src/libs";

// type
import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiCreatePhotoResponse, PhotoKinds } from "@src/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiCreatePhotoResponse>
) {
  const { query, method } = req;

  // 이미지 업로드 url 받기
  if (method === "GET") {
    if (typeof query.name === "string") {
      const { name, kinds } = query;

      const { photoURL, preSignedURL } = getSignedURL(
        name,
        kinds as PhotoKinds
      );

      return res.status(200).json({
        preSignedURL,
        photoURL,
        message: "이미지를 업로드중입니다. 잠시만 기다려주세요!",
      });
    }
  }

  return res.status(412).json({
    preSignedURL: null,
    photoURL: null,
    message: "잘못된 데이터를 전달받았습니다. 잠시후에 다시 시도해주세요!",
  });
}
