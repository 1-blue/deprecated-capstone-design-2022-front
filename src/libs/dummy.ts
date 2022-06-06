export const getMe = () => ({
  idx: 0,
  id: "admin@naver.com",
  password: "asld123nakkf!@#askfdas",
  name: "관리자",
  avatar: "/avatar.png",
  introduction: "기록과 정리를 좋아하는 개발자입니다! 👏",
});

export const getDummyPosts = (
  kinds: string,
  page: number,
  keyword?: string
) => {
  // 검색 테스트
  if (keyword) {
    if (keyword.toLocaleLowerCase().includes("react")) {
      return Array(4)
        .fill(null)
        .map((v, i) => ({
          idx: i + page * 10,
          title: "React.js [ 키워드 테스트 ]",
          summary: "대충 리액트 관한 내용🐲",
          thumbnail: i % 2 ? "/cat.jpg" : "/venice.jpg",
          updatedAt: new Date(),
          user: {
            idx: 1,
            name: "유저" + i,
            avatar: "/avatar.png",
          },
          keywords: [{ keyword: "React.js" }, { keyword: "Next.js" }],
          _count: {
            comment: i + page * 10,
            favorite: i + page * 10,
          },
        }));
    }
    if (keyword.toLocaleLowerCase().includes("vue")) {
      return Array(4)
        .fill(null)
        .map((v, i) => ({
          idx: i + page * 10,
          title: "Vue.js [ 키워드 테스트 ]",
          summary: "대충 뷰 관한 내용",
          thumbnail: i % 2 ? "/cat.jpg" : "/venice.jpg",
          updatedAt: new Date(),
          user: {
            idx: 1,
            name: "유저" + i,
            avatar: "/avatar.png",
          },
          keywords: [{ keyword: "Next.js" }, { keyword: "Vue.js" }],
          _count: {
            comment: i + page * 10,
            favorite: i + page * 10,
          },
        }));
    }
    if (keyword.toLocaleLowerCase().includes("javascript")) {
      return Array(4)
        .fill(null)
        .map((v, i) => ({
          idx: i + page * 10,
          title: "JavaScript [ 키워드 테스트 ]",
          summary: "대충 자바스크립트 관한 내용",
          thumbnail: i % 2 ? "/cat.jpg" : "/venice.jpg",
          updatedAt: new Date(),
          user: {
            idx: 1,
            name: "유저" + i,
            avatar: "/avatar.png",
          },
          keywords: [{ keyword: "Next.js" }, { keyword: "JavaScript" }],
          _count: {
            comment: i + page * 10,
            favorite: i + page * 10,
          },
        }));
    }
  }
  const posts = Array(20)
    .fill(null)
    .map((v, i) => ({
      idx: i + page * 10,
      title: "대충 제목 - " + i + page * 10,
      summary:
        "대충 이런 저런\n줄바꿈하고\n👀🐲✒️➖🚨🔍🧨🌓🚀\n이모티콘도 넣어보고\n이런 내용 아무튼 - " +
        i +
        page * 10,
      thumbnail: i % 2 ? "/cat.jpg" : "/venice.jpg",
      updatedAt: Date.now() - 1000 * 60 * 60 * 24 * i,
      user: {
        idx: 1,
        name: "유저" + i,
        avatar: "/avatar.png",
      },
      keywords: [
        { keyword: "React.js" },
        { keyword: "Next.js" },
        { keyword: "Vue.js" },
        { keyword: "JavaScript" },
        { keyword: "HTML5" },
        { keyword: "CSS3" },
        { keyword: "SWR" },
        { keyword: "AWS" },
        { keyword: "tailwindCss" },
        { keyword: "styled-components" },
      ],
      _count: {
        comment: i + page * 10,
        favorite: i + page * 10,
      },
    }));

  if (kinds === "popular") return posts.reverse();
  else return posts;
};

export const getDummyPost = () => ({
  idx: 0,
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
    comment: 12,
    favorite: 3,
  },
  keywords: [
    { keyword: "React.js" },
    { keyword: "Vue.js" },
    { keyword: "Node.js" },
  ],
});

export const getRelevantPosts = () =>
  Array(4)
    .fill(null)
    .map((v, i) => ({
      idx: i,
      title: `React.js [테스트용 연관 게시글 - ${i}]`,
      thumbnail: "/venice.jpg",
      updatedAt: new Date(Date.now()),
      summary: "대충 요약",
      user: getMe(),
      _count: {
        comment: 0,
        favorite: i,
      },
    }));

export const getCategorizedPosts = () =>
  Array(8)
    .fill(null)
    .map((v, i) => ({
      idx: i,
      title: `React.js [테스트용 카테고리 게시글 - ${i}]`,
      thumbnail: "/cat.jpg",
      updatedAt: new Date(Date.now()),
      summary: "대충 요약",
      user: getMe(),
      _count: {
        comment: 0,
        favorite: i,
      },
    }));

export const getRecomments = (number: number) => {
  return Array(14)
    .fill(null)
    .map((v, i) => ({
      idx: i + 2000,
      contents: "답글 🐲 - " + i,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      user: getMe(),
      postIdx: 1,
      commentIdx: i + number * 10,
    }));
};

export const getComments = (page: number) => {
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
        recomments: i === 0 || i === 1 ? getRecomments(0) : undefined,
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

export const getLikers = () =>
  Array(3)
    .fill(null)
    .map((v, i) => ({
      idx: i,
      name: "테스트 유저" + i,
      avatar: "/avatar.png",
      introduction: "테스트 아무말" + i,
    }));

export const getTempPosts = (page: number) => {
  if (page === 0) {
    return Array(6)
      .fill(null)
      .map((v, i) => ({
        idx: i,
        title: "임시 저장 게시글" + i,
        updatedAt: Date.now(),
        summary: "임시 저장 내🐲\n༼ つ ◕_◕ ༽つ\n( ´･･)ﾉ(._.`)" + i,
      }));
  } else if (page === 1) {
    return Array(3)
      .fill(null)
      .map((v, i) => ({
        idx: i,
        title: "추가된 임시 저장 게시글" + i,
        updatedAt: Date.now(),
        summary: "추가된 임시 저장 내🐲" + i,
      }));
  }
};

export const getLikedPosts = () =>
  Array(7)
    .fill(null)
    .map((v, i) => ({
      idx: i,
      title: "좋아요 누른 게시글",
      updatedAt: Date.now(),
      summary: "좋아요\n༼ つ ◕_◕ ༽つ",
      thumbnail: "/cat.jpg",
      user: {
        idx: 1,
        name: "유저",
      },
      _count: {
        comment: 123,
        favorite: 25,
      },
    }));
