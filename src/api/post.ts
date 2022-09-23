import { axiosInstance } from ".";

// type
import type { ApiGetPostsBody, ApiGetPostsResponse } from "@src/types";

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
 * 2022/09/23 - 게시글 관련 api 요청 객체 - by 1-blue
 */
const postService = {
  apiGetPosts,
};

export default postService;
