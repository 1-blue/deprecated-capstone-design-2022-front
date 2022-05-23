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
  thumbnail?: string;

  userIdx: number;
  categoryIdx: number;
};
type SimplePost = {
  idx: number;
  title: string;
  updatedAt: Date;
  summary: string;
  thumbnail?: string;
};

type Keyword = {
  idx: number;
  keyword: string;
};
type SimpleKeyword = {
  keyword: string;
};

type Comment = {
  idx: number;
  contents: string;
  createdAt: Date;
  updatedAt: Date;

  userIdx: number;
  postIdx: number;
  commentIdx?: number;
};

interface ICategoryWithCount {
  category: string;
  _count: {
    post: number;
  }
}
interface IPostWithUserAndCount extends Post {
  user: SimpleUser;
  _count: {
    comment: number;
    favorite: number;
  };
}
interface IPostWithUserAndKeywordAndCount extends Post {
  user: SimpleUser;
  keywords: SimpleKeyword[];
  _count: {
    comment: number;
    favorite: number;
  };
}
interface ICommentWithUser extends Comment {
  user: SimpleUser;
  recomments?: ICommentWithUser[];
}
interface IRecommentWithUser extends Comment {
  user: SimpleUser;
}

type ResponseStatus = {
  ok: boolean;
}
```

1. User, Post => 1 : N ( `userIdx` )
1. User, TemporaryPost => 1 : N ( `userIdx` )
1. Post, Comment => 1 : N ( `postIdx` )
1. Comment, Comment => 1 : N ( `commentIdx` )
1. 게시글 키워드 => Post, Keyword => N : M
1. 게시글 좋아요 => User, Post => N : M

// >>> 로그인/회원가입( 아직 미구현 ), 논의할거 제외하고 처리 완료
## 1. 유저
// >>> 수정 완료 ( + `SimpleUser` -> `User` )
### 1.1 GET /api/user/:name

- 목적: 특정 유저의 간단한 정보 요청
- 전송: `name`
- 응답

```typescript
{
  status: ResponseStatus;
  data: {
    user: User;
  }
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
  status: ResponseStatus;
}
```

### 1.3 GET /api/user/me

- 목적: 로그인한 유저의 정보 요청
- 전송: cookie

- 응답

```typescript
{
  status: ResponseStatus;
  data: {
    user: User;
  }
}
```

// >>> 수정 완료
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
  status: ResponseStatus;
}
```
// >>> 수정 완료
### 1.5 DELETE /api/user

- 목적: 로그인한 유저의 정보 회원 탈퇴 요청
- 전송: cookie
- 응답

```typescript
{
  status: ResponseStatus
}
```
// >>> 논의 후 수정 /pages/[name]/index.tsx
### 1.6 GET /api/user/:name/posts?page=page&offset=offset&kinds=kinds

- 목적: 특정 유저의 게시글들 정보 요청
- 전송: `name`, `page`, `offset`, `kinds`
- 응답

```typescript
{
  status: ResponseStatus;
  data: {
    posts: IPostWithUserAndCount[];
  }
}
```
// >>> 논의 후 수정 /pages/[name]/category/[category].tsx
### 1.7 GET /api/user/:name/category/:category

- 목적: 특정 유저의 특정 카테고리에 해당하는 게시글들 요청
- 전송: `name`, `category`
- 응답

```typescript
{
  status: ResponseStatus;
  data: {
    posts: IPostWithUserAndCount[];
  }
}
```

// >>> 특정 게시글 수정 제외하고 완료 ( 특정 게시글 수정하는 거 사용 안하는것 같음 나중에 확인하기 )
## 2. 게시글
// >>> 수정 완료
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
  status: ResponseStatus;
  data: {
    title: string;
  }
}
```
// >>> 수정 완료 ( + `keywords` 추가 )
### 2.2 GET /api/posts?page=page&offset=offset&kinds=kinds&keywords=keywords

- 목적: ( 특정 키워드를 가진 ) 최신/인기순 게시글들 일부 요청
- 전송: `page`, `offset`, `kinds`, `keywords` ( `kinds` -> `latest`, `popular` )
- 응답

```typescript
{
  status: ResponseStatus;
  data: {
    posts: IPostWithUserAndCount[];
  }
}
```
// >>> 수정 완료
### 2.3 GET /api/post/:title

- 목적: 로그인한 유저의 특정 게시글 상세 정보 요청
- 전송: `title`
- 응답

```typescript
{
  status: ResponseStatus;
  data: {
    post: IPostWithUserAndKeywordAndCount;
  }
}
```
// >>> 수정 완료
### 2.4 GET /api/post/:title/relevant

- 목적: 해당 게시글의 연관된 게시글들 요청
- 전송: `title`
- 응답

```typescript
{
  status: ResponseStatus;
  data: {
    posts: IPostWithUserAndCount[];
  }
}
```

// >>> 수정 완료 ( + 응답 `category` 추가 )
### 2.5 GET /api/post/:title/categorized

- 목적: 해당 게시글과 같은 카테고리를 가진 로그인한 유저의 게시글들 요청
- 전송: `title`
- 응답

```typescript
{
  status: ResponseStatus;
  data: {
    category: string;
    posts: IPostWithUserAndCount[];
  }
}
```

### 2.6 PATCH /api/post/:title

- 목적: 로그인한 유저의 특정 게시글 수정 요청
- 전송: `title`
- 응답

```typescript
{
  status: ResponseStatus;
  data: {
    postIdx: number;
  }
}
```
// >>> 수정 완료
### 2.7 DELETE /api/post/:title

- 목적: 로그인한 유저의 특정 게시글 삭제 요청
- 전송: `title`
- 응답

```typescript
{
  status: ResponseStatus;
}
```

// >>> 수정 완료
## 3. 댓글/답글
// >>> 수정 완료 ( + 수정 `status` )
### 3.1 POST /api/post/:postTitle/comment

- 목적: 댓글/답글 생성
- 전송

```typescript
{
  status: ResponseStatus;
}
```

- 응답

```typescript
{
  status: ResponseStatus;
}
```
// >>> 수정 완료
### 3.2 GET /api/post/:postTitle/comment?page=page&offset=offset

- 목적: 특정 게시글의 최신순 댓글 일부/답글 전체 요청
- 전송: `postTitle`, `page`, `offset`
- 응답

```typescript
{
  status: ResponseStatus;
  data: {
    comments: ICommentWithUser[];
  }
}
```
// >>> 수정 완료
### 3.3 DELETE /api/post/:postTitle/comment/:commentIdx

- 목적: 로그인한 유저의 특정 댓글/답글 삭제 요청
- 전송: `postTitle`, `commentIdx`
- 응답

```typescript
{
  status: ResponseStatus;
}
```

// >>> 수정 완료
## 4. 좋아요
// >>> 수정 완료
### 4.1 POST /api/post/:postTitle/like

- 목적: 특정 게시글 좋아요 생성 요청
- 전송: `postTitle`
- 응답

```typescript
{
  status: ResponseStatus;
}
```
// >>> 수정 완료
### 4.2 DELETE /api/post/:postTitle/like

- 목적: 특정 게시글 좋아요 제거 요청
- 전송: `postTitle`
- 응답

```typescript
{
  status: ResponseStatus;
}
```
// >>> 수정 완료
### 4.3 GET /api/post/:postTitle/like

- 목적: 특정 게시글에 좋아요를 누른 유저들 정보 요청
- 전송: `postTitle`
- 응답

```typescript
{
  status: ResponseStatus;
  data: {
    likers: SimpleUser[];
  }
}
```
// >>> 수정 완료
## 5. 임시 게시글
// >>> 수정 완료 ( + `title`, `tempPostIdx` 추가 )
### 5.1 POST /api/temp

- 목적: 임시 게시글 생성/수정 ( `tempPostIdx`가 존재하는 경우 수정 )
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
  status: ResponseStatus;
  data: {
    title: string
    tempPostIdx: number;
  }
}
```
// >>> 수정 완료
### 5.2 GET /api/temp?page=page&offset=offset

- 목적: 로그인한 유저의 임시 게시글들 요청
- 전송: `cookie`
- 응답

```typescript
{
  status: ResponseStatus;
  data: {
    posts: SimplePost[];
  }
}
```

// >>> 5.3 미사용으로 제거
// >>> 5.4는 5.1과 통합

// >>> 수정 완료
### 5.5 DELETE /api/temp/:postTitle

- 목적: 로그인한 유저의 특정 임시 게시글 삭제 요청
- 전송: `postTitle`
- 응답

```typescript
{
  status: ResponseStatus;
}
```

// >>> 6. 게시글 검색 미사용으로 인해 제거함

// >>> 수정 완료
## 6. 이미지
// >>> 수정 완료
### 6.1 POST /api/photo

- 목적: 이미지 업로드
- 전송: `multipart/formData`형식에 `photo`이름으로 전달
- 응답

```typescript
{
  status: ResponseStatus;
  data: {
    photoUrl: string;
  }
}
```

// >>> 수정 완료
## 7. 카테고리
// >>> 수정 완료
### 7.1 GET /api/category

- 목적: 로그인한 유저의 카테고리들 요청
- 전송: `cookie`
- 응답

```typescript
{
  status: ResponseStatus;
  data: {
    categorys: ICategoryWithCount[];
  }
}
```

// >>> 수정 완료
## 8. 리스트
// >>> 수정 완료
### 8.1 GET /api/lists/liked

- 목적: 로그인한 유저가 좋아요 누른 게시글들 요청
- 전송: `cookie`
- 응답

```typescript
{
  status: ResponseStatus;
  data: {
    posts: IPostWithUserAndCount[];
  }
}
```
