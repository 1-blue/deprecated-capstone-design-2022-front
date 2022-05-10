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

// 2022/04/10 - 단축 유저 타입 - by 1-blue
export type SimpleUser = {
  id: number;
  name: string;
  avatar?: string;
  introduction?: string;
};

// 2022/04/30 - 단축 게시글 타입 - by 1-blue
export type SimplePost = {
  id: number;
  title: string;
  thumbnail?: string;
  updatedAt: Date;
  summary: string;
  user: SimpleUser;
  _count: {
    comments: number;
    favorite: number;
  };
};

// 2022/04/30 - 단축 키워드 타입 - by 1-blue
export type SimpleKeyword = {
  keyword: string;
};

// 2022/04/10 - 게시글 타입 - by 1-blue
export type Post = {
  id: number;
  title: string;
  contents: string;
  thumbnail: string;
  updatedAt: Date;
  summary: string;
  user: SimpleUser;
  keywords: SimpleKeyword[];
  _count: {
    comments: number;
    favorite: number;
  };
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

// 2022/04/10 - 로그인한 유저 반환 타입 - by 1-blue
export type ApiResponseOfMe = {
  ok: boolean;
  user: SimpleUser;
};
// 2022/04/10 - 인기/최신/검색 게시글 반환 타입 - by 1-blue
export type ApiResponseOfPosts = {
  posts: SimplePost[];
};
