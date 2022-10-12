import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWRImmutable from "swr/immutable";
import { useSession } from "next-auth/react";

// api
import apiService from "@src/api";

// util
import { combinePhotoUrl } from "@src/libs";

// hook
import usePhoto from "@src/hooks/usePhoto";

// component
import InputSetting from "@src/components/Write/InputSetting";
import Markdown from "@src/components/common/Markdown";
import Spinner from "@src/components/common/Spinner";
import Icon from "@src/components/common/Icon";
import HeadInfo from "@src/components/common/HeadInfo";

// type
import type { NextPage } from "next";
import type { ChangeEvent, DragEvent, KeyboardEvent } from "react";
import type { ApiGetPostByUpdateResponse } from "@src/types";
import { ICON } from "@src/types";
import { AxiosError } from "axios";

export type WriteForm = {
  title: string;
  keyword: string;
  contents: string;
};

export type PostMetadata = {
  summary: string;
  isPrivate: boolean;
  category: string;
  thumbnail: string;
};

const Write: NextPage = () => {
  const { data } = useSession();
  const router = useRouter();

  // 2022/09/25 - 임시 저장한 게시글의 식별자 - by 1-blue
  const [temporaryPostIdx, setTemporaryPostIdx] = useState<number | null>(null);
  // 2022/04/26 - markdown관련 헬퍼 함수들 - by 1-blue
  const { register, watch, getValues, setValue } = useForm<WriteForm>();
  // 2022/04/27 - 태그가 들어갈 배열 - by 1-blue
  const [keywords, setKeywords] = useState<string[]>([]);

  // 2022/09/24 - 게시글 임시 저장 - by 1-blue
  const onTemporarySave = useCallback(async () => {
    const title = getValues("title");
    const contents = getValues("contents");

    if (!title) return toast.error("제목을 입력해주세요!");
    if (!contents) return toast.error("내용을 입력해주세요!");

    try {
      const {
        data: { message, temporaryPostIdx },
      } = await apiService.postService.apiCreateTemporaryPost({
        title,
        contents,
        keywords,
      });

      setTemporaryPostIdx(temporaryPostIdx);

      toast.success(message);
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("알 수 없는 에러입니다.");
      }
    }
  }, [getValues, keywords]);

  // 2022/04/27 - ctrl + s 감지 핸들러 - by 1-blue
  const handleSave = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      let charCode = String.fromCharCode(e.which).toLowerCase();
      if ((e.ctrlKey || e.metaKey) && charCode === "s") {
        e.preventDefault();
        onTemporarySave();
        return;
      }
    },
    [onTemporarySave]
  );

  // 2022/04/27 - 화면상에서 태그 생성 - by 1-blue
  const onCreateKeyword = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();

        // 소문자화 / 공백 제거
        const keyword = getValues("keyword")
          .toLocaleLowerCase()
          .replace(/ /g, "");
        if (!keyword) return;

        setKeywords((prev) => {
          if (prev.length >= 10) {
            toast.warning("태그는 최대 10개까지만 생성이 가능합니다.");
            return prev;
          }
          const prevKeywordsLength = prev.length;
          const nextKeywords = [...prev, keyword].filter(
            (v, i, arr) => arr.indexOf(v) === i
          );
          if (prevKeywordsLength === nextKeywords.length)
            toast.warning("중복된 태그는 생성할 수 없습니다.");

          return nextKeywords;
        });

        setValue("keyword", "");
      }
    },
    [getValues, setKeywords, setValue]
  );
  // 2022/04/27 - 화면상에서 태그 제거 - by 1-blue
  const onRemoveKeyword = useCallback(
    (keyword: string) => () => {
      setKeywords((prev) => prev.filter((v) => v !== keyword));
    },
    [setKeywords]
  );

  // 2022/04/29 - 게시글 제출 화면인지 판단하는 변수 - by 1-blue
  const [isPreview, setIsPreview] = useState(false);
  // 2022/04/29 - 게시글 생성 미리보기로 이동 - by 1-blue
  const onMovePreview = useCallback(() => {
    const title = getValues("title");
    const contents = getValues("contents");

    if (!title) return toast.error("제목을 입력해주세요!");
    if (!contents) return toast.error("내용을 입력해주세요!");

    setIsPreview(true);
  }, [getValues, setIsPreview]);
  // 2022/04/27 - 게시글 생성 취소 - by 1-blue
  const onCancelCreatePost = useCallback(() => {
    if (
      !confirm(
        "정말 게시글 생성을 취소하겠습니까?\n만약 저장하지 않았다면 되돌릴 수 없습니다!"
      )
    )
      return;

    router.back();
  }, [router]);

  // 2022/04/28 - 이미지 input ref - by 1-blue
  const photoRef = useRef<HTMLInputElement>(null);
  // 2022/04/28 - 이미지 드래그중인지 판단할 변수 - by 1-blue
  const [isDragging, setIsDragging] = useState(false);
  // 2022/04/28 - 이미지 업로드 로딩 변수 - by 1-blue
  const [uploadLoading, setUploadLoading] = useState(false);

  // 2022/09/25 - 게시글 이미지 업로드 함수 - by 1-blue
  const [uploadPhotoByClick, uploadPhotoByDrop] = usePhoto({
    kinds: "post",
  });
  // 2022/09/25 - 이미지 업로드 ( 파일 탐색기 이용 ) - by 1-blue
  const onUploadPhotoByExplorer = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setUploadLoading(true);

      const photoURL = await uploadPhotoByClick(e);

      if (photoURL)
        setValue(
          "contents",
          getValues("contents") + `\n![이미지](${combinePhotoUrl(photoURL)})`
        );

      setUploadLoading(false);
      setIsDragging(false);
    },
    [uploadPhotoByClick, setUploadLoading, getValues, setValue, setIsDragging]
  );
  // 2022/09/25 - 이미지 업로드 ( 드래그 앤 드랍 ) - by 1-blue
  const onUploadPhotoByDrop = useCallback(
    async (e: DragEvent<HTMLDivElement>) => {
      setUploadLoading(true);

      const photoURL = await uploadPhotoByDrop(e);

      if (photoURL)
        setValue(
          "contents",
          getValues("contents") + `\n![이미지](${combinePhotoUrl(photoURL)})`
        );

      setUploadLoading(false);
      setIsDragging(false);
    },
    [uploadPhotoByDrop, getValues, setValue, setUploadLoading, setIsDragging]
  );

  // 2022/04/29 - 게시글 생성 관련 옵션값들 ( 하위 컴포넌트에서 사용하지만 상위에 두는 이유는 하위 컴포넌트가 제거되어도 값을 보존하기 위함 ) - by 1-blue
  const [postMetadata, setPostMetadata] = useState<PostMetadata>({
    category: "",
    isPrivate: false,
    summary: "",
    thumbnail: "",
  });
  // 2022/09/25 - 게시글 생성 요청 - by 1-blue
  const onCreatePost = useCallback(async () => {
    const title = getValues("title");
    const contents = getValues("contents");
    if (!title) return toast.error("제목을 입력해주세요!");
    if (!contents) return toast.error("내용을 입력해주세요!");

    const { thumbnail, ...rest } = postMetadata;

    try {
      const {
        data: { message },
      } = await apiService.postService.apiCreatePost({
        title,
        contents,
        keywords,
        photo: thumbnail,
        temporaryPostIdx,
        ...rest,
      });

      toast.success(message);

      router.push(`/${data?.user.name}/${title}`);
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("알 수 없는 에러입니다.");
      }
    }
  }, [getValues, keywords, postMetadata, router, data, temporaryPostIdx]);

  // 2022/09/24 - 수정이라면 게시글 정보 가져오기 - by 1-blue
  const { data: currentPost, isValidating: currentPostLoading } =
    useSWRImmutable<ApiGetPostByUpdateResponse>(
      router.query?.title
        ? encodeURI(`/api/post/temporary?title=${router.query.title}`)
        : null
    );

  // 2022/09/24 - 수정이라면 데이터 채우기 - by 1-blue
  useEffect(() => {
    if (!currentPost || !currentPost.post) return;

    setValue("title", currentPost.post.title);
    setValue("contents", currentPost.post.contents);
    setKeywords(
      currentPost.post.keywords.map(({ keyword }) => keyword.keyword)
    );
  }, [currentPost, setValue]);

  return (
    <>
      <HeadInfo
        title="Jslog | 게시글 생성"
        description="Jslog의 게시글 생성 페이지입니다."
      />

      <article
        className="flex h-screen"
        onKeyDown={handleSave}
        onDragOver={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
      >
        {/* 좌측 입력 영역 */}
        <section className="flex-1 dark:bg-zinc-800 bg-zinc-200 p-4">
          {isDragging ? (
            // 이미지 드래그중일 때 랜더링
            <div
              className="flex flex-col h-full justify-center items-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={onUploadPhotoByDrop}
            >
              <span>🖼️이미지를 여기에 드래그 해주세요!</span>
              <Icon icon={ICON.PHOTO} className="w-32 h-32" />
            </div>
          ) : (
            <form className="flex flex-col h-full">
              <input
                type="file"
                accept="image/*"
                ref={photoRef}
                onChange={onUploadPhotoByExplorer}
                hidden
              />
              <input
                autoFocus
                type="text"
                placeholder="제목을 입력하세요"
                className="p-4 bg-transparent focus:outline-none text-3xl font-bold"
                {...register("title")}
              />
              <input
                type="text"
                placeholder="태그를 입력하세요"
                className="p-4 bg-transparent focus:outline-none"
                {...register("keyword")}
                onKeyDown={onCreateKeyword}
              />
              <ul className="px-4 flex flex-wrap space-x-2">
                {keywords.map((keyword) => (
                  <li key={keyword}>
                    <button
                      type="button"
                      onClick={onRemoveKeyword(keyword)}
                      tabIndex={-1}
                      className="bg-zinc-300 text-indigo-500 hover:bg-zinc-400 hover:text-indigo-600 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:text-indigo-300 dark:hover:text-indigo-400 py-2 px-4 mb-2 rounded-md font-semibold"
                    >
                      {keyword}
                    </button>
                  </li>
                ))}
              </ul>
              <ul className="flex">
                <div className="flex-1" />
                <button
                  type="button"
                  onClick={() => photoRef.current?.click()}
                  className="p-1 rounded-md hover:text-white hover:bg-black dark:hover:text-black dark:hover:bg-white focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                >
                  <Icon icon={ICON.PHOTO} className="w-6 h-6" />
                </button>
              </ul>
              <textarea
                placeholder="당신의 이야기를 적어보세요..."
                className="p-4 bg-transparent focus:outline-none flex-1 resize-none"
                {...register("contents")}
              />
              <div className="flex space-x-2  bg-zinc-100 dark:bg-zinc-700 p-4 -m-4">
                <button
                  type="button"
                  className="px-2 py-1 rounded-md hover:bg-zinc-500 hover:text-white transition-colors focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2"
                  onClick={onCancelCreatePost}
                >
                  ◂ 나가기
                </button>
                <div className="flex-1" />
                <button
                  type="button"
                  className="px-2 py-1 rounded-md hover:bg-zinc-500 hover:text-white transition-colors focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2"
                  onClick={onTemporarySave}
                >
                  임시저장
                </button>
                <button
                  type="button"
                  className="px-2 py-1 rounded-md hover:bg-zinc-500 hover:text-white transition-colors focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2"
                  onClick={onMovePreview}
                >
                  출간하기
                </button>
              </div>
            </form>
          )}
        </section>

        {/* 우측 결과물 미리보기 영역 */}
        <section className="flex-1 hidden sm:inline-block overflow-auto">
          <h1 className="p-4 block text-5xl mb-4">{watch("title")}</h1>
          <Markdown markdown={watch("contents")} />
        </section>
      </article>

      {/* 게시글 미리보기 및 설정 */}
      {isPreview && (
        <InputSetting
          onCreatePost={onCreatePost}
          title={getValues("title")}
          setIsPreview={setIsPreview}
          postMetadata={postMetadata}
          setPostMetadata={setPostMetadata}
        />
      )}

      {/* 게시글 업로드 스피너 */}
      {uploadLoading && <Spinner kinds="page" />}

      {/* 게시글 수정 시 정보 받는 스피너 */}
      {router.query.title && currentPostLoading && <Spinner kinds="page" />}
    </>
  );
};

export default Write;
