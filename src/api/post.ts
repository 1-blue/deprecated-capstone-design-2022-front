import { axiosInstance } from ".";

// type
import type {
  ApiDeletePostBody,
  ApiDeletePostResponse,
  ApiGetPostBody,
  ApiGetPostResponse,
  ApiGetPostsBody,
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
 */
const apiDeletePost = ({ postIdx }: ApiDeletePostBody) =>
  axiosInstance.delete<ApiDeletePostResponse>(
    encodeURI(`/post?postIdx=${postIdx}`)
  );

/**
 * 2022/09/23 - 게시글 관련 api 요청 객체 - by 1-blue
 */
const postService = {
  apiGetPosts,
  apiGetPost,
  apiDeletePost,
};

export default postService;
