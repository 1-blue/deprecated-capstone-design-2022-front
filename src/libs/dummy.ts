// type
import {
  Comment,
  Post,
  SimpleKeyword,
  SimplePost,
  SimpleUser,
} from "@src/types";

interface IPostWithKeyword extends Post {
  keywords: SimpleKeyword[];
}
interface ICommentWithUser extends Comment {
  user: SimpleUser;
}

export const getMe = (): SimpleUser => ({
  id: 0,
  name: "관리자",
  avatar: "/avatar.png",
  introduction: "기록과 정리를 좋아하는 개발자입니다! 👏",
});

export const getDummyPosts = (): SimplePost[] =>
  Array(10)
    .fill(null)
    .map((v, i) => ({
      id: i,
      title: "대충 제목 - " + i,
      summary:
        "대충 이런 저런\n줄바꿈하고\n👀🐲✒️➖🚨🔍🧨🌓🚀\n이모티콘도 넣어보고\n이런 내용 아무튼 - " +
        i,
      thumbnail: i % 2 ? "/cat.jpg" : "/venice.jpg",
      updatedAt: new Date(),
      user: {
        id: 1,
        name: "유저" + i,
        avatar: "/avatar.png",
      },
      keywords: [{ keyword: "React.js" }],
      _count: {
        comments: i,
        favorite: i,
      },
    }));

export const getDummyPost = (): IPostWithKeyword => ({
  id: 0,
  title: "React.js [테스트용 게시글]",
  contents: `# 첫 번째 목록 테스트
  + 순서
  + 순서
  1. 숫자
  2. 숫자

  ## 두 번째 코드 블럭 테스트
  \`\`\`
  코드 블럭
  \`\`\`

  
  ### 세 번째 블럭 테스트
  \`테스트\`

  # h1 테스트

  #### 네 번째 테이블 테스트
  |제목|내용|설명|
  |:---|---:|:---:|
  |왼쪽정렬|오른쪽정렬|중앙정렬|
  |왼쪽정렬|오른쪽정렬|중앙정렬|
  |왼쪽정렬|오른쪽정렬|중앙정렬|

  ## h2 테스트

  ##### 다섯 번째 글자 형식 테스트
  **굵은 글씨**
  ~중간라인~

  ###### 여섯 번째 링크, 이미지, 문구 테스트
  [링크](https://github.com/1-blue)
  ![이미지](https://blemarket.s3.ap-northeast-2.amazonaws.com/images/production/germany_1650793243414)

  > 👉 중요한 내용 👈
  `,
  thumbnail: "/venice.jpg",
  updatedAt: new Date(Date.now()),
  summary: "대충 요약",
  user: getMe(),
  _count: {
    comments: 0,
    favorite: 5,
  },
  keywords: [
    { keyword: "React.js" },
    { keyword: "Vue.js" },
    { keyword: "Node.js" },
  ],
});

export const getRelevantPosts = (): SimplePost[] =>
  Array(4)
    .fill(null)
    .map((v, i) => ({
      id: i,
      title: `React.js [테스트용 연관 게시글 - ${i}]`,
      thumbnail: "/venice.jpg",
      updatedAt: new Date(Date.now()),
      summary: "대충 요약",
      user: getMe(),
      _count: {
        comments: 0,
        favorite: i,
      },
    }));

export const getCategorizedPosts = (): SimplePost[] =>
  Array(8)
    .fill(null)
    .map((v, i) => ({
      id: i,
      title: `React.js [테스트용 카테고리 게시글 - ${i}]`,
      thumbnail: "/cat.jpg",
      updatedAt: new Date(Date.now()),
      summary: "대충 요약",
      user: getMe(),
      _count: {
        comments: 0,
        favorite: i,
      },
    }));

export const getComments = (page: number): ICommentWithUser[] => {
  if (page === 0) {
    return Array(10)
      .fill(null)
      .map((v, i) => ({
        idx: i,
        contents: "댓글 - " + i,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        user: getMe(),
        postIdx: 1,
      }));
  } else if (page === 1) {
    return Array(3)
      .fill(null)
      .map((v, i) => ({
        idx: i + 5,
        contents: "추가로 패치한 댓글 - " + i + 5,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        user: getMe(),
        postIdx: 1,
      }));
  }
  return [];
};

export const getLikers = (): SimpleUser[] =>
  Array(3)
    .fill(null)
    .map((v, i) => ({
      id: i,
      name: "테스트 유저" + i,
      avatar: "/avatar.png",
      introduction: "테스트 아무말" + i,
    }));
