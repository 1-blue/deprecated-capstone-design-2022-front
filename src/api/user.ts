import { axiosInstance } from ".";

// type
import type {
  // ApiDeleteUserBody,
  ApiDeleteUserResponse,
  ApiGetUserBody,
  ApiGetUserResponse,
  ApiUpdateUserBody,
  ApiUpdateUserResponse,
} from "@src/types";

/**
 * 2022/09/26 - 특정 유저의 접근 가능한 정보 요청 - by 1-blue
 * @param body name: 특정 유저의 이름
 * @returns 특정 유저의 접근 가능한 데이터
 */
const apiGetUser = ({ name }: ApiGetUserBody) =>
  axiosInstance.get<ApiGetUserResponse>(encodeURI(`/user?name=${name}`));

/**
 * 2022/09/26 - 유저 정보 수정 요청 - by 1-blue
 * @param body 수정할 정보들
 * @returns 결과 메시지
 */
const apiUpdateUser = (body: ApiUpdateUserBody) =>
  axiosInstance.patch<ApiUpdateUserResponse>("/user", body);

/**
 * 2022/09/27 - 회원 탈퇴 요청 - by 1-blue
 * @returns 결과 메시지
 */
const apiDeleteUser = () =>
  axiosInstance.delete<ApiDeleteUserResponse>("/user");

/**
 * 2022/09/26 - 유저 관련 api 요청 객체 - by 1-blue
 */
const userService = {
  apiGetUser,
  apiUpdateUser,
  apiDeleteUser,
};

export default userService;
