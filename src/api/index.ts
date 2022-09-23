import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL + "/api",
  withCredentials: true,
  timeout: 10000,
});

import photoService from "./photo";
import authService from "./auth";
import postService from "./post";

/**
 * 2022/09/23 - api요청 관련 메서드들을 가진 객체 - by 1-blue
 */
const apiService = {
  photoService,
  authService,
  postService,
};

export default apiService;
