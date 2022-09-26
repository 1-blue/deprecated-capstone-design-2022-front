import { axiosInstance } from ".";

// type
import type {
  ApiCreateFavoriteBody,
  ApiCreateFavoriteResponse,
  ApiCreatePostBody,
  ApiCreatePostResponse,
  ApiCreateTemporaryPostBody,
  ApiCreateTemporaryPostResponse,
  ApiDeleteFavoriteBody,
  ApiDeleteFavoriteResponse,
  ApiDeletePostBody,
  ApiDeletePostResponse,
  ApiGetPostBody,
  ApiGetPostResponse,
  ApiGetPostsBody,
  ApiGetPostsByCategoryBody,
  ApiGetPostsByCategoryResponse,
  ApiGetPostsResponse,
} from "@src/types";

/**
 * 2022/09/23 - 게시글들 패치 - by 1-blue
 * @param body lastIdx: 마지막 게시글 식별자, limit: 게시글 요청 개수, kinds: 인기순/최신순
 * @returns 게시글들
 */
const apiGetPosts = ({ lastIdx, limit, kinds }: ApiGetPostsBody) =>
  axiosInstance.get<ApiGetPostsResponse>(
    `/posts?lastIdx=${lastIdx}&limit=${limit}&kinds=${kinds}`
  );

/**
 * 2022/09/24 - 특정 게시글 패치 - by 1-blue
 * @param body name: 게시글의 작성자 이름, title: 게시글의 제목
 * @returns 특정 게시글
 */
const apiGetPost = ({ name, title }: ApiGetPostBody) =>
  axiosInstance.get<ApiGetPostResponse>(
    encodeURI(`/post?name=${name}&title=${title}`)
  );

/**
 * 특정 게시글과 연관된 게시글들 불러오는 함수는 생략 ( SWR로 처리함 )
 */

/**
 * 2022/09/24 - 특정 게시글 제거 - by 1-blue
 * @param body postIdx: 게시글 식별자
 * @returns 결과 메시지
 */
const apiDeletePost = ({ postIdx }: ApiDeletePostBody) =>
  axiosInstance.delete<ApiDeletePostResponse>(`/post?postIdx=${postIdx}`);

/**
 * 2022/09/24 - 특정 게시글에 좋아요 생성 - by 1-blue
 * @param body postIdx: 게시글 식별자
 * @returns 결과 메시지
 */
const apiCreateFavorite = ({ postIdx }: ApiCreateFavoriteBody) =>
  axiosInstance.post<ApiCreateFavoriteResponse>(
    `/post/favorite?postIdx=${postIdx}`
  );

/**
 * 2022/09/24 - 특정 게시글에 좋아요 제거 - by 1-blue
 * @param body postIdx: 게시글 식별자
 * @returns 결과 메시지
 */
const apiDeleteFavorite = ({ postIdx }: ApiDeleteFavoriteBody) =>
  axiosInstance.delete<ApiDeleteFavoriteResponse>(
    `/post/favorite?postIdx=${postIdx}`
  );

/**
 * 2022/09/24 - 게시글 생성 - by 1-blue
 * @param body 게시글 생성에 필요한 데이터
 * @returns 결과 메시지
 */
const apiCreatePost = (body: ApiCreatePostBody) =>
  axiosInstance.post<ApiCreatePostResponse>(`/post`, body);

/**
 * 2022/09/24 - 게시글 임시 생성 - by 1-blue
 * @param body 게시글 임시 생성에 필요한 데이터
 * @returns 결과 메시지
 */
const apiCreateTemporaryPost = (body: ApiCreateTemporaryPostBody) =>
  axiosInstance.post<ApiCreateTemporaryPostResponse>(`/post/temporary`, body);

/**
 * 2022/09/25 - 특정 게시글과 같은 작성자면서 같은 카테고리를 가진 게시글들 요청 - by 1-blue
 * @param body postIdx: 게시글 식별자, userIdx: 게시글 작성자 식별자
 * @returns 게시글들의 제목
 */
const apiGetPostsByCategory = ({
  postIdx,
  userIdx,
}: ApiGetPostsByCategoryBody) =>
  axiosInstance.get<ApiGetPostsByCategoryResponse>(
    `/post/category?postIdx=${postIdx}&userIdx=${userIdx}`
  );

/**
 * 2022/09/23 - 게시글 관련 api 요청 객체 - by 1-blue
 */
const postService = {
  apiGetPosts,
  apiGetPost,
  apiDeletePost,
  apiCreateFavorite,
  apiDeleteFavorite,
  apiCreatePost,
  apiCreateTemporaryPost,
  apiGetPostsByCategory,
};

export default postService;
