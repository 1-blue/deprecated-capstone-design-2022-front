// type
import type { Category, Keyword, Post, User } from "@prisma/client";
import type {
  PhotoKinds,
  PostKinds,
  PostWithSimpleData,
  PostWithData,
  CommentWithData,
  SimpleUser,
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
 * 2022/09/24 - 게시글 제거 요청 송신 타입 - by 1-blue
 */
export type ApiDeletePostBody = {
  postIdx: number;
};
/**
 * 2022/09/24 - 게시글 제거 요청 수신 타입 - by 1-blue
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
 * 2022/09/24 - 게시글 생성 송신 타입 - by 1-blue
 */
export type ApiCreatePostBody = {
  title: string;
  contents: string;
  summary?: string;
  photo?: string;
  keywords: string[];
  category?: string;
  temporaryPostIdx: number | null;
};
/**
 * 2022/09/24 - 게시글 생성 수신 타입 - by 1-blue
 */
export type ApiCreatePostResponse = ApiResponse & {};

/**
 * 2022/09/24 - 임시 게시글 생성 송신 타입 - by 1-blue
 */
export type ApiCreateTemporaryPostBody = {
  title: string;
  contents: string;
  summary?: string;
  photo?: string;
  keywords: string[];
  category?: string;
};
/**
 * 2022/09/24 - 임시 게시글 생성 수신 타입 - by 1-blue
 */
export type ApiCreateTemporaryPostResponse = ApiResponse & {
  temporaryPostIdx: number;
};

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

/**
 * 2022/09/26 - 특정 유저의 간단한 정보 송신 타입 - by 1-blue
 */
export type ApiGetUserBody = {
  name: string;
};
/**
 * 2022/09/26 - 특정 유저의 간단한 정보 수신 타입 - by 1-blue
 */
export type ApiGetUserResponse = ApiResponse & {
  user: SimpleUser;
};

/**
 * 2022/09/26 - 특정 유저의 게시글들 요청 송신 타입 - by 1-blue
 */
export type ApiGetPostsOfUserBody = {
  lastIdx: number;
  limit: number;
  username: string;
};
/**
 * 2022/09/26 - 특정 유저의 게시글들 요청 수신 타입 - by 1-blue
 */
export type ApiGetPostsOfUserResponse = ApiResponse & {
  posts: (PostWithSimpleData & {
    keywords: {
      keyword: Keyword;
    }[];
  })[];
};

/**
 * 2022/09/26 - 특정 유저의 카테고리와 그 게시글들 요청 송신 타입 - by 1-blue
 */
export type ApiGetPostsOfUserWithCategoryBody = {
  userIdx: number;
};
/**
 * 2022/09/26 - 특정 유저의 카테고리와 그 게시글들 요청 수신 타입 - by 1-blue
 */
export type ApiGetPostsOfUserWithCategoryResponse = ApiResponse & {
  categories: {
    category: string;
    _count: {
      posts: number;
    };
    posts: {
      photo: string | null;
    }[];
  }[];
};

/**
 * 2022/09/26 - 특정 유저의 특정 카테고리의 게시글들 요청 송신 타입 - by 1-blue
 */
export type ApiGetPostsOfUserAndCategoryBody = {
  userIdx: number;
  category: string;
};
/**
 * 2022/09/26 - 특정 유저의 특정 카테고리의 게시글들 요청 수신 타입 - by 1-blue
 */
export type ApiGetPostsOfUserAndCategoryResponse = ApiResponse & {
  posts: {
    idx: number;
    title: string;
    summary: string | null;
    photo: string | null;
    updatedAt: Date;
    _count: {
      comments: number;
      favorites: number;
    };
  }[];
};

/**
 * 2022/09/26 - 유저 정보 수정 요청 송신 타입 - by 1-blue
 */
export type ApiUpdateUserBody = Partial<User> & { userIdx: number };
/**
 * 2022/09/26 - 유저 정보 수정 요청 수신 타입 - by 1-blue
 */
export type ApiUpdateUserResponse = ApiResponse & {};

/**
 * 2022/09/26 - 로그인한 유저의 임시글 목록 요청 송신 타입 - by 1-blue
 */
export type ApiGetPostsOfTemporaryBody = {};
/**
 * 2022/09/26 - 로그인한 유저의 임시글 목록 요청 수신 타입 - by 1-blue
 */
export type ApiGetPostsOfTemporaryResponse = ApiResponse & {
  posts: {
    idx: number;
    title: string;
    contents: string;
    updatedAt: Date;
  }[];
};

/**
 * 2022/09/26 - 특정 임시 게시글 제거 요청 송신 타입 - by 1-blue
 */
export type ApiDeleteTemporaryPostBody = {
  postIdx: number;
};
/**
 * 2022/09/26 - 특정 임시 게시글 제거 요청 수신 타입 - by 1-blue
 */
export type ApiDeleteTemporaryPostResponse = ApiResponse & {};

/**
 * 2022/09/26 - 좋아요 누른 게시글들 요청 송신 타입 - by 1-blue
 */
export type ApiGetPostsOfFavoriteBody = {};
/**
 * 2022/09/26 - 좋아요 누른 게시글들 요청 수신 타입 - by 1-blue
 */
export type ApiGetPostsOfFavoriteResponse = ApiResponse & {
  posts: (Post & {
    _count: {
      comments: number;
      favorites: number;
    };
    User: {
      name: string;
      photo: string | null;
    };
  })[];
};

/**
 * 2022/09/26 - 특정 키워드를 가진 게시글들 요청 송신 타입 - by 1-blue
 * ( 게시글 검색 )
 */
export type ApiGetPostsOfSearchBody = {
  lastIdx: number;
  limit: number;
  kinds: PostKinds;
  keyword: string;
};
/**
 * 2022/09/26 - 특정 키워드를 가진 게시글들 요청 수신 타입 - by 1-blue
 * ( 게시글 검색 )
 */
export type ApiGetPostsOfSearchResponse = ApiResponse & {
  posts: (Post & {
    _count: {
      comments: number;
      favorites: number;
    };
    User: {
      name: string;
      photo: string | null;
    };
    keywords: {
      keyword: Keyword;
    }[];
  })[];
};

/**
 * 2022/09/27 - 회원 탈퇴 송신 타입 - by 1-blue
 */
export type ApiDeleteUserBody = {};
/**
 * 2022/09/27 - 회원 탈퇴 수신 타입 - by 1-blue
 */
export type ApiDeleteUserResponse = ApiResponse & {};
