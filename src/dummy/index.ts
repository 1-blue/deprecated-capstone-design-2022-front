// type
import type { Post, User } from "@prisma/client";

// 예시 이미지들
const photos = [
  "photos/development/seed/cat.jpg",
  "photos/development/seed/chick.jpg",
  "photos/development/seed/dog.jpg",
  "photos/development/seed/giraffe.jpg",
  "photos/development/seed/jellyfish.jpg",
  "photos/development/seed/parrot.jpg",
  "photos/development/seed/rabbit.jpg",
  "photos/development/seed/reindeer.jpg",
  "photos/development/seed/squirrel.jpg",
  "photos/development/seed/toucan.jpg",
];

// 예시 키워드들
export const keywords = [
  "React.js",
  "Vue.js",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "AWS",
  "styled-component",
  "tailwindCss",
];

/**
 * 2022/09/23 - 관리자 유저 데이터 - by 1-blue
 */
export const getAdminUser = (): Omit<User, "idx"> => ({
  name: "관리자",
  id: "a",
  password: "$2b$06$2dZH5QkrdzeLKo4eWkFC/.wd/iuO87L5CsF6FXvs1C0UzvcZpRYjq",
  photo: null,
  introduction: "관리자 유저입니다.\n😥❌🤌📑🧭💵💵✍️🔒",
  role: "ADMIN",
  provider: "Credentials",
});

/**
 * 2022/09/23 - 가짜 게시글들 데이터 - by 1-blue
 * @param number 생성할 게시글 개수
 * @returns
 */
export const getDummyPosts = (number: number): Omit<Post, "idx">[] =>
  Array(number)
    .fill(null)
    .map(() => ({
      title: "제목 - " + (Date.now() - Math.floor(Math.random() * 10000)),
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

> 👉 중요한 내용 👈`,
      summary:
        "게시글 요약\n줄바꿈\n🛁🚿🪣🧻🛋️🛏️🪟🚪🪑\n༼ つ ◕_◕ ༽つ\n" +
        (Date.now() - Math.floor(Math.random() * 10000)),
      updatedAt: new Date(Date.now() - Math.floor(Math.random() * 10000)),
      photo: photos[Math.floor(Math.random() * 10)],
      isTemporary: false,
      isPrivate: false,
      userIdx: 1,
      cateogoryIdx: null,
    }));

/**
 * 2022/09/23 - 가짜 키워드들 데이터 - by 1-blue
 * @param number 생성할 키워드 개수
 * @returns
 */
export const getDummyKeywords = (number: number) =>
  Array(number)
    .fill(null)
    .map(() => keywords[Math.floor(Math.random() * 10)]);
