import type { Comment, Keyword, Post, User } from "@prisma/client";

/**
 * 2022/09/23 - 이미지 종류 - by 1-blue
 */
export type PhotoKinds = "user" | "post" | "remove";

/**
 * 2022/09/23 - 게시글 요청 종류 - by 1-blue
 */
export type PostKinds = "popular" | "recent" | "relevant";

/**
 * 2022/09/23 - 단축 유저 타입 - by 1-blue
 */
export type SimpleUser = Pick<User, "idx" | "name" | "photo" | "introduction">;

/**
 * 2022/09/23 - 게시글 목록에서 사용할 타입 - by 1-blue
 */
export type PostWithSimpleData = Post & {
  User: Pick<User, "name" | "photo">;
  _count: {
    comments: number;
    favorites: number;
  };
};

/**
 * 2022/09/24 - 상세 게시글의 상세 데이터 타입 - by 1-blue
 */
export type PostWithData = Post & {
  User: Pick<User, "idx" | "name" | "photo" | "introduction">;
  keywords: { keyword: Keyword }[];
  favorites: { userIdx: number }[];
  _count: { comments: number };
};

/**
 * 2022/09/24 -댓글 타입 - by 1-blue
 */
export type CommentWithUser = Comment & {
  User: {
    idx: number;
    name: string;
    photo: string | null;
  };
};
/**
 * 2022/09/24 - 특정 게시글에서 사용할 댓글 타입 - by 1-blue
 */
export type CommentWithData = Comment & {
  User: {
    idx: number;
    name: string;
    photo: string | null;
  };
  replys: CommentWithUser[];
};
