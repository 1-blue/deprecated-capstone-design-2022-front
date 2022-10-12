import { PrismaClient } from "@prisma/client";

import {
  getAdminUser,
  getDummyKeywords,
  getDummyPosts,
  keywords,
} from "../src/dummy";

const prisma = new PrismaClient();

/**
 * 2022/09/23 - 관리자 유저 생성 - by 1-blue
 */
const createAdminUser = async () => {
  const createdUser = await prisma.user.create({
    data: getAdminUser(),
  });

  console.log("prisma seed createdUser >> ", createdUser);
};

/**
 * 2022/09/23 - 가짜(예시) 키워드들 생성 - by 1-blue
 */
const createKeywords = async () => {
  await prisma.keyword.createMany({
    data: keywords.map((keyword) => ({ keyword: keyword.toLocaleLowerCase() })),
    skipDuplicates: true,
  });
};

/**
 * 2022/09/23 - 가짜 게시글들 생성 - by 1-blue
 * @param number 생성할 게시글 개수
 */
const createPosts = async (number: number) => {
  try {
    // 가짜 게시글들 생성
    const createdPostPromises = getDummyPosts(number).map((post) =>
      prisma.post.create({ data: post })
    );
    const createdPosts = await Promise.all(createdPostPromises);

    // 키워드와 게시글 연결
    const postsOnKeywordsPromises = createdPosts.map(({ idx }) =>
      prisma.post.update({
        where: { idx },
        data: {
          keywords: {
            createMany: {
              data: getDummyKeywords(2).map((keyword) => ({
                keywordIdx: keyword.toLocaleLowerCase(),
              })),
              skipDuplicates: true,
            },
          },
        },
      })
    );

    const result = await Promise.allSettled(postsOnKeywordsPromises);

    console.log("prisma seeed create posts result >> ", result);
  } catch (error) {
    console.error("error >> ", error);
  }
};

async function main() {
  // 관리자 유저 생성
  await createAdminUser();

  // 가짜(예시) 키워드들 생성
  await createKeywords();

  // 가짜 게시글들 생성
  await createPosts(5);
}

main()
  .catch((e) => console.log(e))
  .finally(() => prisma.$disconnect);
