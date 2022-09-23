import type { User } from "@prisma/client";

// 2022/09/23 - 이미지 종류 - by 1-blue
export type PhotoKinds = "user" | "post" | "remove";

// 2022/09/23 - 단축 유저 타입 - by 1-blue
export type SimpleUser = Pick<User, "idx" | "name" | "photo" | "introduction">;
