// type
import { Post, SimpleUser } from "@src/types";

export const getMe = (): SimpleUser => ({
  id: 0,
  name: "관리자",
  avatar: "/avatar.png",
});

export const getDummyPosts = (): Post[] =>
  Array(10)
    .fill(null)
    .map((v, i) => ({
      id: i,
      title: "대충 제목 - " + i,
      contents:
        "대충 이런 저런\n줄바꿈하고\n👀🐲✒️➖🚨🔍🧨🌓🚀\n이모티콘도 넣어보고\n이런 내용 아무튼 - " +
        i,
      thumbnail: i % 2 ? "/cat.jpg" : "/venice.jpg",
      updatedAt: new Date(),
      user: {
        id: 1,
        name: "유저" + i,
        avatar: "/avatar.png",
      },
      _count: {
        comments: i,
        favorite: i,
      },
    }));
