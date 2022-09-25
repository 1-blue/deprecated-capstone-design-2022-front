import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { toast } from "react-toastify";

// api
import apiService from "@src/api";

// util
import { combineClassNames } from "@src/libs/util";

// component
import Photo from "@src/components/common/Photo";
import Icon from "@src/components/common/Icon";
import Spinner from "@src/components/common/Spinner";

// type
import type { ApiGetCategoriesResponse } from "@src/types";
import type { PostMetadata } from "@src/pages/write";
import { AxiosError } from "axios";
import { ICON } from "@src/types";

type CategoryForm = {
  category: string;
};
type Props = {
  onCreatePost: () => void;
  title: string;
  setIsPreview: Dispatch<SetStateAction<boolean>>;
  postMetadata: PostMetadata;
  setPostMetadata: Dispatch<SetStateAction<PostMetadata>>;
};

const InputSetting = ({
  onCreatePost,
  title,
  setIsPreview,
  postMetadata,
  setPostMetadata,
}: Props) => {
  // 2022/04/29 - 섬네일 - by 1-blue
  const thumbnailRef = useRef<HTMLInputElement>(null);
  // 2022/04/29 - 섬네일 업로드 로딩 변수 - by 1-blue
  const [uploadThumbnailLoading, setUploadThumbnailLoading] = useState(false);
  // 2022/04/29 - 섬네일 업로드 - by 1-blue
  const onUploadThumbnail = useCallback(
    async (e: any) => {
      setUploadThumbnailLoading(true);

      if (!e.target.files) return;
      if (e.target.files?.length === 0) return;

      const file = e.target.files[0];

      try {
        const { photoURL } = await apiService.photoService.apiCreatePhoto({
          file,
          kinds: "post",
        });

        // 알 수 없는 이유로 이미지 업로드 실패
        if (!photoURL) return toast.warning("이미지를 업로드하지 못했습니다.");

        setPostMetadata((prev) => ({ ...prev, thumbnail: photoURL }));

        toast.success("이미지를 업로드했습니다.");
      } catch (error) {
        console.error("error >> ", error);

        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("알 수 없는 에러가 발생했습니다.");
        }
      } finally {
        setUploadThumbnailLoading(false);
      }
    },
    [setPostMetadata, setUploadThumbnailLoading]
  );

  // 2022/09/25 - 로그인한 유저의 카테고리들 - by 1-blue
  const { data: categoryResponse, mutate: categoryMutate } =
    useSWR<ApiGetCategoriesResponse>("/api/category");
  // 2022/04/29 - 카테고리 변수 - by 1-blue
  const [isShowCategory, setIsShowCategory] = useState(false);
  // 2022/04/29 - 카테고리 임시 등록 변수 - by 1-ble
  const [tempCategory, setTempCategory] = useState("");
  // 2022/04/29 - 카테고리 등록 - by 1-blue
  const onChangeCategory = useCallback(
    (value: string) => () => {
      setTempCategory(value);
    },
    [setTempCategory]
  );
  // 2022/04/29 - 카테고리 추가 관련 메서드 - by 1-blue
  const { register, handleSubmit, reset } = useForm<CategoryForm>();
  // 2022/04/29 - 카테고리 추가 - by 1-blue
  const onAddCategory = useCallback(
    ({ category }: CategoryForm) => {
      try {
        apiService.categoryService.apiCreateCategory({ category });

        categoryMutate(
          (prev) =>
            prev && {
              ...prev,
              categories: [...prev.categories, { category }],
            },
          false
        );
      } catch (error) {
        console.error("error >> ", error);

        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("알 수 없는 에러가 발생했습니다.");
        }
      } finally {
        reset();
      }
    },
    [categoryMutate, reset]
  );

  return (
    <>
      <article className="z-1 fixed top-0 left-0 w-screen h-screen bg-white dark:bg-gray-800 flex md:justify-center md:items-center space-y-8 md:space-x-8 animate-slide-up flex-col md:flex-row p-4 overflow-auto">
        {/* 좌측 영역 */}
        <section className="space-y-8 w-full md:max-w-[350px] md:w-[40vw] md:h-[60vh]">
          {/* 섬네일 입력 */}
          <form className="space-y-2">
            <h3 className="text-xl font-bold">포스트 미리보기</h3>
            <input
              type="file"
              accept="image/*"
              hidden
              ref={thumbnailRef}
              onChange={onUploadThumbnail}
            />
            {postMetadata.thumbnail ? (
              <Photo
                photo={postMetadata.thumbnail}
                className="w-full pt-[60%] md:h-48 m-0"
                $cover
              />
            ) : (
              <>
                <button
                  type="button"
                  className="group w-full md:h-48 h-72 md:pt-0 bg-transparent flex flex-col justify-center items-center rounded-sm border-2 border-indigo-500 hover:border-indigo-600 text-indigo-500 hover:text-indigo-600"
                  onClick={() => thumbnailRef.current?.click()}
                >
                  <Icon icon={ICON.PHOTO} className="w-[80px] h-[80px]" />
                  <span className="text-lg font-semibold py-2 px-4 rounded-md border-2 border-indigo-500 group-hover:border-indigo-600">
                    섬네일 업로드
                  </span>
                </button>
              </>
            )}
          </form>
          {/* 요약 입력 */}
          <form className="space-y-2">
            <h3 className="text-xl font-bold">{title}</h3>
            <textarea
              rows={5}
              className="resize-none w-full p-2 focus:outline-none bg-zinc-100 dark:bg-zinc-600 rounded-sm border-2 border-zinc-600 dark:border-zinc-400"
              onChange={(e) =>
                setPostMetadata((prev) => ({
                  ...prev,
                  summary: e.target.value,
                }))
              }
              value={postMetadata.summary}
              placeholder="👇 한 줄 요약을 작성해주세요! 👇"
            />
          </form>
        </section>

        {/* 우측 영역 */}
        {isShowCategory ? (
          // 카테고리 입력
          <section className="flex flex-col w-full md:max-w-[350px] md:w-[40vw] md:h-[60vh]">
            <h3 className="text-xl font-bold mb-2">카테고리 설정</h3>
            <form
              className="bg-zinc-300 dark:bg-zinc-700 p-4"
              onSubmit={handleSubmit(onAddCategory)}
            >
              <input
                type="text"
                placeholder="새로운 카테고리 이름을 입력하세요"
                className="p-2 w-full"
                {...register("category")}
              />
            </form>

            <ul className="flex flex-col divide-y bg-zinc-300 dark:bg-zinc-700 overflow-auto mb-9">
              {categoryResponse?.categories.map(({ category }) => (
                <button
                  type="button"
                  key={category}
                  className={combineClassNames(
                    "py-2 px-4 text-left hover:bg-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-white",
                    tempCategory === category
                      ? "bg-zinc-400 dark:bg-zinc-800"
                      : ""
                  )}
                  onClick={onChangeCategory(category)}
                >
                  {category}
                </button>
              ))}
            </ul>

            <section className="text-right space-x-2">
              <button
                type="button"
                onClick={() => {
                  setTempCategory("");
                  setIsShowCategory(false);
                }}
                className="w-1/4 p-2 rounded-md bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:hover:text-white"
              >
                취소
              </button>
              <button
                type="button"
                className="w-1/4 p-2 rounded-md bg-zinc-500 text-white hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:hover:text-white disabled:bg-zinc-200 dark:disabled:text-white disabled:cursor-not-allowed"
                disabled={tempCategory.length === 0}
                onClick={() => {
                  setPostMetadata((prev) => ({
                    ...prev,
                    category: tempCategory,
                  }));
                  setTempCategory("");
                  setIsShowCategory(false);
                }}
              >
                선택하기
              </button>
            </section>
          </section>
        ) : (
          // 공개/카테고리/취소/출간 버튼
          <section className="flex flex-col space-y-8 w-full md:max-w-[350px] md:w-[40vw] md:h-[60vh]">
            {/* 공개 설정 */}
            <section className="space-y-2">
              <h3 className="text-xl font-bold">공개 설정</h3>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className={combineClassNames(
                    "flex-1 p-2 rounded-md font-semibold flex justify-center space-x-2 border-2 hover:border-indigo-600 hover:text-indigo-600",
                    postMetadata.isPrivate
                      ? "border-zinc-400 text-zinc-400"
                      : "border-indigo-500 text-indigo-500"
                  )}
                  onClick={() =>
                    setPostMetadata((prev) => ({ ...prev, isPrivate: false }))
                  }
                >
                  <Icon icon={ICON.EARTH} className="w-6 h-6" />
                  <span>전체 공개</span>
                </button>
                <button
                  type="button"
                  className={combineClassNames(
                    "flex-1 p-2 rounded-md font-semibold flex justify-center space-x-2 border-2 hover:border-indigo-600 hover:text-indigo-600",
                    postMetadata.isPrivate
                      ? "border-indigo-500 text-indigo-500"
                      : "border-zinc-400 text-zinc-400"
                  )}
                  onClick={() =>
                    setPostMetadata((prev) => ({ ...prev, isPrivate: true }))
                  }
                >
                  <Icon icon={ICON.LOCK} className="w-6 h-6" />
                  <span>비공개</span>
                </button>
              </div>
            </section>
            {/* 카테고리 설정 */}
            <section className="space-y-2">
              <h3 className="text-xl font-bold">카테고리 설정</h3>
              <button
                type="button"
                className={combineClassNames(
                  "flex justify-center space-x-2 p-2 rounded-md w-full font-semibold border-2 hover:border-indigo-600 hover:text-indigo-600",
                  postMetadata.category
                    ? "border-indigo-500 text-indigo-500"
                    : "border-zinc-400 text-zinc-400"
                )}
                onClick={() => setIsShowCategory(true)}
              >
                {postMetadata.category ? (
                  postMetadata.category
                ) : (
                  <>
                    <Icon icon={ICON.PLUS_CURCLE} className="w-6 h-6" />
                    <span>카테고리에 추가하기</span>
                  </>
                )}
              </button>
              {postMetadata.category.length > 0 && (
                <button
                  type="button"
                  className="block ml-auto hover:text-indigo-400 hover:underline"
                  onClick={() =>
                    setPostMetadata((prev) => ({ ...prev, category: "" }))
                  }
                >
                  카테고리 제거하기
                </button>
              )}
            </section>

            <div className="flex-1" />

            {/* 취소/출간버튼 */}
            <section className="text-right space-x-2">
              <button
                type="button"
                onClick={() => setIsPreview(false)}
                className="w-1/4 p-2 rounded-md font-semibold border-2 border-indigo-500 text-indigo-500 hover:border-indigo-600 hover:text-indigo-600"
              >
                취소
              </button>
              <button
                type="button"
                onClick={onCreatePost}
                className="w-1/4 p-2 rounded-md font-semibold border-2 border-indigo-500 text-indigo-500 hover:border-indigo-600 hover:text-indigo-600"
              >
                출간하기
              </button>
            </section>
          </section>
        )}
      </article>

      {uploadThumbnailLoading && <Spinner kinds="page" />}
    </>
  );
};

export default InputSetting;
