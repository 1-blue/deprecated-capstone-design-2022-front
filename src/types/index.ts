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
  id: number;
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
  avatar?: string;
  introduction?: string;
};
// 2022/04/10 - 단축 유저 타입 - by 1-blue
export type SimpleUser = {
  idx: number;
  name: string;
  avatar?: string;
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

  postIdx: number;
  commentIdx?: number;
};

// 2022/05/10 - 게시글 + 작성자 + 댓글, 좋아요 개수 타입 - by 1-blue
export interface IPostWithUserAndCount extends Post {
  user: SimpleUser;
  _count: {
    comment: number;
    favorite: number;
  };
}
// 2022/05/10 - 게시글 + 작성자 + 키워드 + 댓글, 좋아요 개수 타입 - by 1-blue
export interface IPostWithUserAndKeywordAndCount extends Post {
  user: SimpleUser;
  keywords: SimpleKeyword[];
  _count: {
    comment: number;
    favorite: number;
  };
}
// 2022/05/10 - 댓글 + 작성자 - by 1-blue
export interface ICommentWithUser extends Comment {
  user: SimpleUser;
  recomments?: ICommentWithUser[];
}
// 2022/05/10 - 답글 + 작성자 - by 1-blue
export interface IRecommentWithUser extends Comment {
  user: SimpleUser;
}
