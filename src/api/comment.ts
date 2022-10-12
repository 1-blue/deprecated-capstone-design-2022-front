import { axiosInstance } from ".";

// type
import type {
  ApiCreateCommentBody,
  ApiCreateCommentResponse,
  ApiDeleteCommentBody,
  ApiDeleteCommentResponse,
} from "@src/types";

/**
 * 특정 게시글의 댓글들 패치하는 로직은 SWR로 대체
 */

/**
 * 2022/09/24 - 댓글 생성 - by 1-blue
 * @param body postIdx: 특정 게시글 식별자, contents: 댓글 내용
 * @returns
 */
const apiCreateComment = (body: ApiCreateCommentBody) =>
  axiosInstance.post<ApiCreateCommentResponse>(`/comment`, body);

/**
 * 2022/09/24 - 댓글 제거 - by 1-blue
 * @param body postIdx: 특정 게시글 식별자, contents: 댓글 내용
 * @returns
 */
const apiDeleteComment = ({ commentIdx }: ApiDeleteCommentBody) =>
  axiosInstance.delete<ApiDeleteCommentResponse>(
    `/comment?commentIdx=${commentIdx}`
  );

/**
 * 2022/09/24 - 댓글 관련 api 요청 객체 - by 1-blue
 */
const commentService = {
  apiCreateComment,
  apiDeleteComment,
};

export default commentService;
