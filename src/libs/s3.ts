import AWS from "aws-sdk";

// type
import type { PhotoKinds } from "@src/types";

AWS.config.update({
  region: process.env.JSLOG_AWS_REGION,
  accessKeyId: process.env.JSLOG_AWS_ACCESS_KEY,
  secretAccessKey: process.env.JSLOG_AWS_SECRET_KEY,
});

const S3 = new AWS.S3({ apiVersion: "2012-10-17", signatureVersion: "v4" });

/**
 * "이미지.확장자"를 받아서 "경로/이미지_시간.확장자"으로 변경해주는 함수
 * @param name "이미지.확장자" 형태로 전송
 * @returns "경로/이미지_시간.확장자" 형태로 반환
 */
const getPhotoPath = (name: string, kinds: PhotoKinds) => {
  const [filename, ext] = name.split(".");

  return `photos/${
    process.env.NODE_ENV
  }/temporary/${kinds}/${filename}_${Date.now()}.${ext}`;
};

/**
 * "preSignedURL"을 생성하는 함수
 * @param name "이미지.확장자" 형태로 전송
 * @returns "preSignedURL"와 "photoURL"을 반환 ( "photoURL"은 정상적으로 완료 시 이미지 url )
 */
export const getSignedURL = (name: string, kinds: PhotoKinds) => {
  const photoURL = getPhotoPath(name, kinds);

  const preSignedURL = S3.getSignedUrl("putObject", {
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
    Key: photoURL,
    Expires: 20,
  });

  return { preSignedURL, photoURL };
};

/**
 * 2022/09/23 - S3 이미지 제거 - by 1-blue
 * @param photo 이미지 파일 이름
 * @returns
 */
export const deletePhoto = (photo: string) =>
  S3.deleteObject(
    {
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
      Key: photo,
    },
    (error, data) => {
      if (error) console.error("S3 이미지 제거 error >> ", error);
    }
  ).promise();

/**
 * 2022/09/23 - S3 이미지 복사 - by 1-blue
 * @param originalSource: 이미지 파일 이름, location: 이미지 복사 위치
 * @returns
 */
export const copyPhoto = (originalSource: string, location: PhotoKinds) => {
  let Key: unknown = null;
  const firstSlashIndex = originalSource.indexOf("/");
  const secondSlashIndex = originalSource.indexOf("/", firstSlashIndex + 1);

  switch (location) {
    // 이미지 제거
    case "remove":
      Key =
        originalSource.slice(0, secondSlashIndex) +
        "/" +
        location +
        originalSource.slice(secondSlashIndex);
      break;

    // 이미지 사용 확정으로 인한 이미지 이동
    default:
      Key = originalSource.replace("/temporary", "");
      break;
  }

  if (typeof Key !== "string")
    return console.error("이미지 저장 위치가 올바르지 않습니다.");

  return S3.copyObject(
    {
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
      CopySource: process.env.NEXT_PUBLIC_BUCKET_NAME + "/" + originalSource,
      Key,
    },
    (error, data) => {
      /**
       * >>> 여기가 가끔씩 두 번 실행됨, 요청은 한 번으로 확인했고, callback이 두 번 실행되면서 에러가 발생함
       * 하지만 첫 번째 실행에 정상작동해서 이미지 복사는 정상적으로 실행되므로 상관은 없지만 에러 로그가 남는 문제가 발생
       */

      if (error) console.error("S3 이미지 이동 error >> ", error);
    }
  ).promise();
};

/**
 * 2022/09/23 - S3 이미지 이동 ( 복사 후 제거 ) - by 1-blue
 * @param photo: 이미지 파일 이름, location: 이미지 복사 위치
 * @returns
 */
export const movePhoto = async (photo: string, location: PhotoKinds) => {
  // OAuth의 이미지를 사용하는 경우
  if (photo.includes("http")) return;

  try {
    await copyPhoto(photo, location);
    await deletePhoto(photo);
  } catch (error) {
    console.error("movePhoto >> ", error);
  }
};
