import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import bcrypt from "bcrypt";

import prisma from "@src/prisma";

export default NextAuth({
  providers: [
    // 인증 방식 선택 ( 현재는 "id" + "password" )
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: {
          label: "아이디",
          type: "text",
          placeholder: "아이디를 입력하세요.",
        },
        password: {
          label: "비밀번호",
          type: "password",
          placeholder: "비밀번호를 입력하세요.",
        },
      },

      // 로그인 유효성 검사

      async authorize(credentials) {
        if (!credentials)
          throw new Error("잘못된 입력값으로 인한 오류가 발생했습니다.");

        const { id, password } = credentials;

        const exUser = await prisma.user.findUnique({ where: { id } });
        if (!exUser) throw new Error("존재하지 않는 아이디입니다.");
        if (!exUser.password) throw new Error("잘못된 로그인 방식입니다.");

        const result = await bcrypt.compare(password, exUser.password);
        if (!result) throw new Error("비밀번호가 불일치합니다.");

        return exUser;
      },
    }),

    // 카카오 로그인
    KakaoProvider({
      clientId: process.env.KAKAO_ID,
      clientSecret: process.env.KAKAO_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // 카카오 로그인일 경우
      if (account?.provider === "kakao") {
        const exUser = await prisma.user.findFirst({
          where: { provider: "KAKAO", name: token.name! },
        });

        // 등록된 유저가 아니라면 회원가입
        if (!exUser) {
          await prisma.user.create({
            data: {
              name: token.name!,
              photo: token.picture,
              provider: "KAKAO",
            },
          });
        }
      }

      return token;
    },
    // 세션에 로그인한 유저 데이터 입력
    async session({ session }) {
      // >>> 유저를 식별한 유일한 값이 필요함
      const exUser = await prisma.user.findFirst({
        where: { name: session.user.name },
        select: {
          idx: true,
          id: true,
          name: true,
          photo: true,
          introduction: true,
        },
      });

      session.user = exUser!;

      return session;
    },
  },
  secret: process.env.SECRET,
});
