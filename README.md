# 🐲 blelog

> 개발자 블로그인 `velog`를 클론코딩한 프로젝트 입니다.

- [trello](https://trello.com/b/T98vIu6a/capstonedesign-2022)
- [velog](https://velog.io/@1-blue/series/capstonedesign-2022-JsLog)
- [blelog - by vercel](https://blelog.vercel.app)

<section align="center">
  <h2 style="text-align: center; margin: 0;">🛠️ 사용 기술 🛠️</h2>
  <img src="https://img.shields.io/badge/Next.js-818CF8?style=flat-square&logo=Next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCss-06B6D4?style=flat-square&logo=TailwindCss&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=Prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/SWR-818CF8?style=flat-square&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS_S3-232F3E?style=flat-square&logo=AmazonAWS&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-818CF8?style=flat-square&logo=Vercel&logoColor=white" />
</section>

<section align="center">
  <h2 style="text-align: center; margin: 0;">💁‍♂️ 사용 툴 🙋‍♂️</h2>
  <a href="https://trello.com/b/AT4Z2NOe/blemarket">
    <img src="https://img.shields.io/badge/Trello-0052CC?style=flat-square&logo=Trello&logoColor=white" />
  </a>
  <a href="https://velog.io/@1-blue/series/blemarket">
    <img src="https://img.shields.io/badge/Velog-20C997?style=flat-square&logo=Velog&logoColor=white" />
  </a>
  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white" />
  <a href="https://github.com/1-blue/blemarket">
    <img src="https://img.shields.io/badge/GitHub-609926?style=flat-square&logo=GitHub&logoColor=white" />
  </a>
  <img src="https://img.shields.io/badge/Sourcetree-0052CC?style=flat-square&logo=Sourcetree&logoColor=white" />
  <img src="https://img.shields.io/badge/VsCode-007ACC?style=flat-square&logo=VisualStudioCode&logoColor=white" />
</section>

# 🙌 구현 기능

1. 유저 CRUD
2. 게시글 CRUD ( `markdown` 형식 )
3. 댓글/답글 CRD
4. 게시글 좋아요 CRUD
5. 게시글 검색
6. 게시글 임시 저장
7. 게시글 카테고리
8. theme ( dark/white )

# 🚀 가이드 라인

## 1. 설치

```bash
git clone https://github.com/1-blue/capstone-design-2022-front.git

cd capstone-design-2022-front

npm install
```

## 2. .env 작성

```bash
# .env.development, .env.production 두 개 작성
NEXT_PUBLIC_IMAGE_BASE_URL=<작성>
NEXT_PUBLIC_SERVER_URL=<작성>
NEXT_PUBLIC_URL=<작성>
```

## 3. 실행

```bash
# 개발 모드 실행
npm run dev

# 배포 모드 실행
nm -rf .next && npm run build && npm start
```

## 4. 배포

> [vercel](https://vercel.com)을 이용한 배포

# 📽️ 실행 영상 📽️

## 1. 게시글 검색

<img src="https://user-images.githubusercontent.com/63289318/172105425-4ef03677-cd95-44d1-a0bc-8a094bd94e02.gif" width="100%" />

## 2. 게시글 생성 - 1

<img src="https://user-images.githubusercontent.com/63289318/172105445-33dd6b29-6357-4b36-b069-35e880ec7ea9.gif" width="100%" />

## 3. 게시글 생성 - 2

<img src="https://user-images.githubusercontent.com/63289318/172105441-20f8e01a-b0a4-4bf6-9828-b1affc724481.gif" width="100%" />

## 4. 게시글 페이지

<img src="https://user-images.githubusercontent.com/63289318/172105446-e3e418df-8241-42fd-a541-44ff6a2c2648.gif" width="100%" />

## 5. 댓글/답글

<img src="https://user-images.githubusercontent.com/63289318/172105440-d2ad1c18-e07b-4075-9617-ad846ce56391.gif" width="100%" />

## 6. 프로필 페이지

<img src="https://user-images.githubusercontent.com/63289318/172105453-d0dbedab-18a6-4625-bfc9-5066affebfe1.gif" width="100%" />

## 7. 프로필 수정

<img src="https://user-images.githubusercontent.com/63289318/172105456-0ee53363-c238-48c9-93e6-ca916e1c7a13.gif" width="100%" />

## 8. 임시 게시글과 좋아요 누른 게시글

<img src="https://user-images.githubusercontent.com/63289318/172105435-9d2d48db-bf05-489c-9960-44500b4391e9.gif" width="100%" />
