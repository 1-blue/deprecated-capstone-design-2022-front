## 0. 타입

```typescript
type User = {
  idx: number;
  id: string;
  password: string;
  name: string;
  avatar?: string;
  introduction?: string;
};

type SimpleUser = {
  idx: number;
  name: string;
  avatar?: string;
  introduction?: string;
};

type Post = {
  idx: number;
  title: string;
  contents: string;
  createdAt: Date;
  updatedAt: Date;
  isPrivate: boolean;
  summary: string;
  thumbnail: string;

  userIdx: number;
  categoryIdx: number;
};

type Category = {
  idx: number;
  category: string;
};

type Comment = {
  idx: number;
  contents: string;
  createdAt: Date;
  updatedAt: Date;

  postIdx: number;
  commentIdx?: number;
};

type PostKeyword = {
  postIdx: number;
  keywordIdx: number;
  contents: string;
};

type UserPost = {
  userIdx: number;
  postIdx: number;
};

type Keyword = {
  idx: number;
  keyword: string;
};

interface IPostWithUser extends Post {
  user: SimpleUser;
}
interface IPostWithUserKeyword extends IPostWithUser {
  keywords: Keyword[];
}
interface IRecommentWithUser extends Comment {
  user: SimpleUser;
}
interface ICommentWithUser extends Comment {
  user: simpleUser;
  recomments?: IRecommentWithUser[];
}
```

1. User, Post => 1 : N ( `userIdx` )
1. User, TemporaryPost => 1 : N ( `userIdx` )
1. Post, Comment => 1 : N ( `postIdx` )
1. Comment, Comment => 1 : N ( `commentIdx` )
1. 게시글 키워드 => Post, Keyword => N : M
1. 게시글 좋아요 => User, Post => N : M

## 1. 유저

### 1.1 GET /api/user/:userId

- 목적: 특정 유저의 간단한 정보 요청
- 전송: `userId`
- 응답

```typescript
{
  ok: boolean;
  user: SimpleUser;
}
```

### 1.2 POST /api/user

- 목적: 회원가입 요청
- 전송

```typescript
{
  id: string;
  password: string;
  name: string;
  avatar?: string;
  introduction?: string;
}
```

- 응답

```typescript
{
  ok: boolean;
  userIdx: number;
}
```

### 1.3 GET /api/user/me

- 목적: 로그인한 유저의 정보 요청
- 전송: cookie

- 응답

```typescript
{
  ok: boolean;
  user: User;
}
```

### 1.4 PATCH /api/user

- 목적: 로그인한 유저의 정보 수정 요청
- 전송

```typescript
{
  id?: string;
  password?: string;
  name?: string;
  avatar?: string;
  introduction?: string;
}
```

- 응답

```typescript
{
  ok: boolean;
  userIdx: number;
}
```

### 1.5 DELETE /api/user

- 목적: 로그인한 유저의 정보 회원 탈퇴 요청
- 전송: cookie
- 응답

```typescript
{
  ok: boolean;
}
```

## 2. 게시글

### 2.1 POST /api/post

- 목적: 게시글 생성 및 카테고리 생성 및 임시 게시글 제거
- 전송

```typescript
{
  title: string;
  contents: string;
  keywords?: string[];
  tempPostIdx?: number;
  isPrivate: boolean;
  summary: string;
  thumbnail: string;
  category?: string;
}
```

- 응답

```typescript
{
  ok: boolean;
  title: string;
}
```

### 2.2 GET /api/post?page=page&offset=offset

- 목적: 최신순 게시글들 일부 요청
- 전송: `page`, `offset`
- 응답

```typescript
{
  ok: boolean;
  posts: IPostWithUser[];
}
```

### 2.3 GET /api/post/:title

- 목적: 로그인한 유저의 특정 게시글 상세 정보 요청 && 해당 게시글의 연관된 게시글 요청 && 해당 게시글과 같은 카테고리를 가진 게시글 요청
- 전송: `title`
- 응답

```typescript
{
  ok: boolean;
  post: IPostWithUserKeyword[];
}
```

### 2.4 GET /api/post/:title/relevant

- 목적: 해당 게시글의 연관된 게시글들 요청
- 전송: `title`
- 응답

```typescript
{
  ok: boolean;
  posts: IPostWithUser[];
}
```

### 2.5 GET /api/post/:title/categorized

- 목적: 해당 게시글과 같은 카테고리를 가진 로그인한 유저의 게시글들 요청
- 전송: `title`
- 응답

```typescript
{
  ok: boolean;
  posts: IPostWithUser[];
}
```

### 2.6 PATCH /api/post/:title

- 목적: 로그인한 유저의 특정 게시글 수정 요청
- 전송: `title`
- 응답

```typescript
{
  ok: boolean;
  postIdx: number;
}
```

### 2.7 DELETE /api/post/:title

- 목적: 로그인한 유저의 특정 게시글 삭제 요청
- 전송: `title`
- 응답

```typescript
{
  ok: boolean;
}
```

## 3. 댓글/답글

### 3.1 POST /api/post/:postTitle/comment

- 목적: 댓글/답글 생성
- 전송

```typescript
{
  contents: string;
  commentIdx?: number;
}
```

- 응답

```typescript
{
  ok: boolean;
}
```

### 3.2 GET /api/post/:postTitle/comment?page=page&offset=offset

- 목적: 특정 게시글의 최신순 댓글 일부/답글 전체 요청
- 전송: `postTitle`, `page`, `offset`
- 응답

```typescript
{
  ok: boolean;
  comments: ICommentWithUser[];
}
```

### 3.3 DELETE /api/post/:postTitle/comment/:commentIdx

- 목적: 로그인한 유저의 특정 댓글/답글 삭제 요청
- 전송: `postTitle`, `commentIdx`
- 응답

```typescript
{
  ok: boolean;
}
```

## 4. 좋아요

### 4.1 POST /api/post/:postTitle/like

- 목적: 특정 게시글 좋아요 생성 요청
- 전송: `postTitle`
- 응답

```typescript
{
  ok: boolean;
}
```

### 4.2 DELETE /api/post/:postTitle/like

- 목적: 특정 게시글 좋아요 제거 요청
- 전송: `postTitle`
- 응답

```typescript
{
  ok: boolean;
}
```

### 4.3 GET /api/post/:postTitle/like

- 목적: 특정 게시글에 좋아요를 누른 유저들 정보 요청
- 전송: `postTitle`
- 응답

```typescript
{
  ok: boolean;
  likers: SimpleUser[];
}
```

## 5. 임시 게시글

### 5.1 POST /api/temp

- 목적: 임시 게시글 생성
- 전송

```typescript
{
  title: string;
  contents: string;
  keywords?: string[];
  tempPostIdx?: number;
}
```

- 응답

```typescript
{
  ok: boolean;
  tempPostIdx: number;
}
```

### 5.2 GET /api/temp?page=page&offset=offset

- 목적: 로그인한 유저의 임시 게시글들 요청
- 전송: `cookie`
- 응답

```typescript
{
  ok: boolean;
  posts: IPostWithUser[];
}
```

### 5.3 GET /api/temp/:postTitle

- 목적: 로그인한 유저의 임시 게시글 상세 정보 요청
- 전송: `postTitle`
- 응답

```typescript
{
  ok: boolean;
  post: IPostWithUserKeyword;
}
```

### 5.4 PATCH /api/temp/:postTitle

- 목적: 로그인한 유저의 특정 임시 게시글 수정 요청
- 전송: `postTitle`
- 응답

```typescript
{
  ok: boolean;
}
```

### 5.5 DELETE /api/temp/:postTitle

- 목적: 로그인한 유저의 특정 임시 게시글 삭제 요청
- 전송: `postTitle`
- 응답

```typescript
{
  ok: boolean;
}
```

## 6. 게시글 검색

### 6.1 GET /api/search?keyword=keyword&page=page&offset=offset

- 목적: 특정 키워드를 이용한 게시글 검색
- 전송: `keyword`, `page`, `offset`
- 응답

```typescript
{
  ok: boolean;
  posts: IPostWithUser;
}
```

## 7. 이미지

### 7.1 POST /api/photo

- 목적: 이미지 업로드
- 전송: `multipart/formData`형식에 `photo`이름으로 전달
- 응답

```typescript
{
  ok: boolean;
  photoUrl: string;
}
```

## 8. 카테고리

### 8.1 GET /api/category

- 목적: 로그인한 유저의 카테고리들 요청
- 전송: `cookie`
- 응답

```typescript
{
  ok: boolean;
  categorys: string[];
}
```
