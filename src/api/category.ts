import { axiosInstance } from ".";

// type
import type {
  ApiCreateCategoryBody,
  ApiCreateCategoryResponse,
  // ApiGetCategoriesBody,
  ApiGetCategoriesResponse,
} from "@src/types";

/**
 * 2022/09/25 - 로그인한 유저의 모든 카테고리 요청 - by 1-blue
 * @returns 결과 메시지
 */
const apiGetCategories = () =>
  axiosInstance.get<ApiGetCategoriesResponse>(`/category`);

/**
 * 2022/09/25 - 카테고리 생성 요청 - by 1-blue
 * @param body category: 생성할 카테고리 이름
 * @returns 결과 메시지
 */
const apiCreateCategory = (body: ApiCreateCategoryBody) =>
  axiosInstance.post<ApiCreateCategoryResponse>(`/category`, body);

/**
 * 2022/09/25 - 카테고리 관련 api 요청 객체 - by 1-blue
 */
const categoryService = {
  apiGetCategories,
  apiCreateCategory,
};

export default categoryService;
