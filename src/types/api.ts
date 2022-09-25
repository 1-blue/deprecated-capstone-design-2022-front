// type
import type { Category, Keyword, Post, User } from "@prisma/client";
import type {
  PhotoKinds,
  PostKinds,
  PostWithSimpleData,
  PostWithData,
  CommentWithData,
} from "@src/types";

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

/**
 * 2022/09/23 - 특정 게시글 요청 송신 타입 - by 1-blue
 */
export type ApiGetPostBody = {
  name: string;
  title: string;
};
/**
 * 2022/09/24 - 특정 게시글 요청 수신 타입 - by 1-blue
 */
export type ApiGetPostResponse = ApiResponse & { post: PostWithData };

/**
 * 2022/09/24 - 특정 게시글과 연관된 게시글 요청 송신 타입 - by 1-blue
 * 연관된 게시글 === 하나라도 같은 키워드를 가지는 게시글
 */
export type ApiGetPostsByRelevantBody = {
  postIdx: number;
};
/**
 * 2022/09/24 - 특정 게시글과 연관된 게시글 요청 수신 타입 - by 1-blue
 * 연관된 게시글 === 하나라도 같은 키워드를 가지는 게시글
 */
export type ApiGetPostByRelevantResponse = ApiResponse & {
  relenvantPosts: PostWithSimpleData[];
};

/**
 * 2022/09/24 - 특정 게시글과 연관된 게시글 요청 송신 타입 - by 1-blue
 */
export type ApiDeletePostBody = {
  postIdx: number;
};
/**
 * 2022/09/24 - 특정 게시글과 연관된 게시글 요청 수신 타입 - by 1-blue
 */
export type ApiDeletePostResponse = ApiResponse & {};

/**
 * 2022/09/24 - 특정 게시글의 댓글들 요청 송신 타입 - by 1-blue
 */
export type ApiGetCommentsBody = {
  postIdx: number;
  lastIdx: number;
  limit: number;
};
/**
 * 2022/09/24 - 특정 게시글의 댓글들 요청 수신 타입 - by 1-blue
 */
export type ApiGetCommentsResponse = ApiResponse & {
  comments: CommentWithData[];
};

/**
 * 2022/09/24 - 특정 게시글에 댓글 생성 송신 타입 - by 1-blue
 */
export type ApiCreateCommentBody = {
  postIdx: number;
  contents: string;
};
/**
 * 2022/09/24 - 특정 게시글에 댓글 생성 수신 타입 - by 1-blue
 */
export type ApiCreateCommentResponse = ApiResponse & {};

/**
 * 2022/09/24 - 특정 댓글 제거 송신 타입 - by 1-blue
 */
export type ApiDeleteCommentBody = {
  commentIdx: number;
};
/**
 * 2022/09/24 - 특정 댓글 제거 수신 타입 - by 1-blue
 */
export type ApiDeleteCommentResponse = ApiResponse & {};

/**
 * 2022/09/24 - 답글 생성 송신 타입 - by 1-blue
 */
export type ApiCreateReplyBody = {
  postIdx: number;
  commentIdx: number;
  contents: string;
};
/**
 * 2022/09/24 - 답글 생성 수신 타입 - by 1-blue
 */
export type ApiCreateReplyResponse = ApiResponse & {};

/**
 * 2022/09/24 - 답글 제거 송신 타입 - by 1-blue
 */
export type ApiDeleteReplyBody = {
  replyIdx: number;
};
/**
 * 2022/09/24 - 답글 제거 수신 타입 - by 1-blue
 */
export type ApiDeleteReplyResponse = ApiResponse & {};

/**
 * 2022/09/24 - 게시글에 좋아요 생성 송신 타입 - by 1-blue
 */
export type ApiCreateFavoriteBody = {
  postIdx: number;
};
/**
 * 2022/09/24 - 게시글에 좋아요 생성 수신 타입 - by 1-blue
 */
export type ApiCreateFavoriteResponse = ApiResponse & {};

/**
 * 2022/09/24 - 게시글에 좋아요 제거 송신 타입 - by 1-blue
 */
export type ApiDeleteFavoriteBody = {
  postIdx: number;
};
/**
 * 2022/09/24 - 게시글에 좋아요 제거 수신 타입 - by 1-blue
 */
export type ApiDeleteFavoriteResponse = ApiResponse & {};

/**
 * 2022/09/24 - 게시글 (임시) 생성 송신 타입 - by 1-blue
 */
export type ApiCreatePostBody = {
  title: string;
  contents: string;
  summary?: string;
  photo?: string;
  keywords: string[];
  category?: string;
};
/**
 * 2022/09/24 - 게시글 (임시) 생성 수신 타입 - by 1-blue
 */
export type ApiCreatePostResponse = ApiResponse & {};

/**
 * 2022/09/24 - 게시글 수정 정보 요청 송신 타입 - by 1-blue
 */
export type ApiGetPostByUpdateBody = {
  title: string;
};
/**
 * 2022/09/24 - 게시글 수정 정보 요청 수신 타입 - by 1-blue
 */
export type ApiGetPostByUpdateResponse = ApiResponse & {
  post:
    | (Post & {
        keywords: {
          keyword: Keyword;
        }[];
        Category: {
          category: string;
        } | null;
      })
    | null;
};

/**
 * 2022/09/25 - 카테고리들 요청 송신 타입 - by 1-blue
 */
export type ApiGetCategoriesBody = {};
/**
 * 2022/09/24 - 카테고리들 요청 수신 타입 - by 1-blue
 */
export type ApiGetCategoriesResponse = ApiResponse & {
  categories: Category[];
};

/**
 * 2022/09/25 - 카테고리 생성 송신 타입 - by 1-blue
 */
export type ApiCreateCategoryBody = {
  category: string;
};
/**
 * 2022/09/24 - 카테고리 생성 수신 타입 - by 1-blue
 */
export type ApiCreateCategoryResponse = ApiResponse & {};

/**
 * 2022/09/25 - 특정 유저의 특정 카테고리를 가진 게시글들 송신 타입 - by 1-blue
 */
export type ApiGetPostsByCategoryBody = {
  postIdx: number;
  userIdx: number;
};
/**
 * 2022/09/24 - 특정 유저의 특정 카테고리를 가진 게시글들 수신 타입 - by 1-blue
 */
export type ApiGetPostsByCategoryResponse = ApiResponse & {
  posts: {
    title: string;
  }[];
};
