import { axiosInstance } from ".";

// type
import type {
  ApiCreateReplyBody,
  ApiCreateReplyResponse,
  ApiDeleteReplyBody,
  ApiDeleteReplyResponse,
} from "@src/types";

/**
 * 특정 게시글의 답글들 패치하는 로직은 SWR로 대체
 */

/**
 * 2022/09/24 - 답글 생성 - by 1-blue
 * @param body commentIdx: 특정 댓글 식별자, contents: 답글 내용
 * @returns
 */
const apiCreateReply = (body: ApiCreateReplyBody) =>
  axiosInstance.post<ApiCreateReplyResponse>(`/reply`, body);

/**
 * 2022/09/24 - 답글 제거 - by 1-blue
 * @param body replyIdx: 특정 답글 식별자
 * @returns
 */
const apiDeleteReply = ({ replyIdx }: ApiDeleteReplyBody) =>
  axiosInstance.delete<ApiDeleteReplyResponse>(`/reply?replyIdx=${replyIdx}`);

/**
 * 2022/09/24 - 답글 관련 api 요청 객체 - by 1-blue
 */
const replyService = {
  apiCreateReply,
  apiDeleteReply,
};

export default replyService;
