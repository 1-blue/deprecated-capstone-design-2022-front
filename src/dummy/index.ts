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
    .map((v, i) => ({
      title: "제목 - " + (Date.now() - Math.floor(Math.random() * 10000)),
      contents:
        "포스트의 내용 부분\n" +
        "🌃🌄🌅🌆♨️💈🛎️🪑🚪🛗🪟🛏️🛋️🪠🧻🪣🚿🛁🧼\n" +
        "༼ つ ◕_◕ ༽つ(👉ﾟヮﾟ)👉👈(ﾟヮﾟ👈)╰(*°▽°*)╯\n" +
        (Date.now() - Math.floor(Math.random() * 10000)),
      updatedAt: new Date(Date.now() - Math.floor(Math.random() * 10000)),
      photo: photos[Math.floor(Math.random() * 10)],
      isTemporary: false,
      userIdx: 1,
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
