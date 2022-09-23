// type
import type { User } from "@prisma/client";
import type { PhotoKinds, PostKinds, PostWithSimpleData } from "@src/types";

/**
 * 2022/09/23 - 모든 api요청이 공통으로 갖는 타입 - by 1-blue
 */
type ApiResponse = {
  message: string | null;
};

/**
 * 2022/09/23 - 단일 이미지 업로드 송신 타입 - by 1-blue
 * 바로 이미지 업로드가 아닌 "preSignedUrl"을 요청하는 것
 */
export type ApiCreatePhotoBody = { file: File; kinds: PhotoKinds };

/**
 * 2022/09/23 - 단일 이미지 업로드 수신 타입 - by 1-blue
 * 바로 이미지 업로드가 아닌 "preSignedUrl"을 요청하는 것
 */
export type ApiCreatePhotoResponse = ApiResponse & {
  preSignedURL: string | null;
  photoURL: string | null;
};

/**
 * 2022/09/23 - 회원가입 송신 타입 - by 1-blue
 */
export type ApiSignUpBody = Omit<User, "idx" | "role" | "provider">;
/**
 * 2022/09/23 - 회원가입 수신 타입 - by 1-blue
 */
export type ApiSignUpResponse = ApiResponse;

/**
 * 2022/09/23 - 로그인 송신 타입 - by 1-blue
 */
export type ApiLogInBody = { id: string; password: string };
/**
 * 2022/09/23 - 로그인 수신 타입 - by 1-blue
 */
export type ApiLogInResponse = ApiResponse & {};

/**
 * 2022/09/23 - 게시글들 요청 송신 타입 - by 1-blue
 */
export type ApiGetPostsBody = {
  kinds: PostKinds;
  lastIdx: number;
  limit: number;
};
/**
 * 2022/09/23 - 게시글들 요청 수신 타입 - by 1-blue
 */
export type ApiGetPostsResponse = ApiResponse & { posts: PostWithSimpleData[] };
