// 2022/09/23 - 자주 사용할 타입 - by 1-blue
export type {
  PhotoKinds,
  PostKinds,
  SimpleUser,
  PostWithSimpleData,
  PostWithData,
  CommentWithUser,
  CommentWithData,
} from "./data";

// 2022/09/23 - api 요청 관련 타입 - by 1-blue
export type {
  ApiCreatePhotoBody,
  ApiCreatePhotoResponse,
  ApiSignUpBody,
  ApiSignUpResponse,
  ApiLogInBody,
  ApiLogInResponse,
  ApiGetPostsBody,
  ApiGetPostsResponse,
  ApiGetPostBody,
  ApiGetPostResponse,
  ApiGetPostByRelevantResponse,
  ApiGetPostsByRelevantBody,
  ApiDeletePostBody,
  ApiDeletePostResponse,
  ApiCreateCommentBody,
  ApiCreateCommentResponse,
  ApiGetCommentsBody,
  ApiGetCommentsResponse,
  ApiDeleteCommentBody,
  ApiDeleteCommentResponse,
  ApiCreateReplyBody,
  ApiCreateReplyResponse,
  ApiDeleteReplyBody,
  ApiDeleteReplyResponse,
  ApiCreateFavoriteBody,
  ApiCreateFavoriteResponse,
  ApiDeleteFavoriteBody,
  ApiDeleteFavoriteResponse,
} from "./api";

// 2022/04/10 - 아이콘 형태 - by 1-blue
export enum ICON {
  SEARCH = "SEARCH",
  MOON = "MOON",
  SUN = "SUN",
  TRENDING_UP = "TRENDING_UP",
  CLOCK = "CLOCK",
  DOT_VERTICAL = "DOT_VERTICAL",
  HEART = "HEART",
  COMMENTS = "COMMENTS",
  CHEVRON_DOWN = "CHEVRON_DOWN",
  PHOTO = "PHOTO",
  EARTH = "EARTH",
  LOCK = "LOCK",
  PLUS_CURCLE = "PLUS_CURCLE",
}

// 2022/04/10 - 게시글 타입 - by 1-blue
export type Post = {
  idx: number;
  title: string;
  contents: string;
  createdAt: Date;
  updatedAt: Date;
  isPrivate: boolean;
  summary: string;
  thumbnail?: string;

  userIdx: number;
  categoryIdx: number;
};
// 2022/04/30 - 단축 게시글 타입 - by 1-blue
export type SimplePost = {
  idx: number;
  title: string;
  updatedAt: Date;
  summary: string;
  thumbnail?: string;
};

// 2022/05/10 - 유저 타입 - by 1-blue
export type User = {
  idx: number;
  id: string;
  password: string;
  name: string;
  avatar?: string | null;
  introduction?: string;
};

// 2022/05/10 - 키워드 타입 ( 뭔가 빠진 부분이 있다고 느껴짐 ) - by 1-blue
export type Keyword = {
  idx: number;
  keyword: string;
};
// 2022/04/30 - 단축 키워드 타입 - by 1-blue
export type SimpleKeyword = {
  keyword: string;
};

// 2022/04/30 - 댓글 타입 - by 1-blue
export type Comment = {
  idx: number;
  contents: string;
  createdAt: Date;
  updatedAt: Date;

  userIdx: number;
  postIdx: number;
  commentIdx?: number;
};

// // 2022/05/10 - 게시글 + 작성자 + 댓글, 좋아요 개수 타입 - by 1-blue
// export interface IPostWithUserAndCount extends Post {
//   user: SimpleUser;
//   _count: {
//     comment: number;
//     favorite: number;
//   };
// }
// // 2022/05/10 - 게시글 + 작성자 + 키워드 + 댓글, 좋아요 개수 타입 - by 1-blue
// export interface IPostWithUserAndKeywordAndCount extends Post {
//   user: SimpleUser;
//   keywords: SimpleKeyword[];
//   _count: {
//     comment: number;
//     favorite: number;
//   };
// }
// // 2022/05/10 - 댓글 + 작성자 - by 1-blue
// export interface ICommentWithUser extends Comment {
//   user: SimpleUser;
//   recomments?: IRecommentWithUser[];
// }
// // 2022/05/10 - 답글 + 작성자 - by 1-blue
// export interface IRecommentWithUser extends Comment {
//   user: SimpleUser;
// }

// 2022/05/14 - 이미지 생성 요청 응답 타입 - by 1-blue
export type ResponseOfPhoto = {
  status: ResponseStatus;
  data: {
    photoUrl: string;
  };
};

// 2022/05/16 - 카테고리와 소속 게시글 개수 타입 - by 1-blue
export interface ICategoryWithCount {
  category: string;
  _count: {
    post: number;
  };
}

// 2022/05/24 - 응답 타입 - by 1-blue
export type ResponseStatus = {
  ok: boolean;
};
