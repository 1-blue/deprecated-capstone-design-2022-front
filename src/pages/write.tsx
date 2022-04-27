import type { NextPage } from "next";
import { useRouter } from "next/router";
import { KeyboardEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// common-component
import Markdown from "@src/components/common/Markdown";

// hook
import useMutation from "@src/hooks/useMutation";
import useToastMessage from "@src/hooks/useToastMessage";
import useMe from "@src/hooks/useMe";

type WriteForm = {
  title: string;
  keyword: string;
  contents: string;
};
type CreatePostResponse = {
  ok: boolean;
  title: string;
};
interface ICreateTemparoryPostResponse extends CreatePostResponse {
  tempPostIdx?: number;
}

const Write: NextPage = () => {
  const router = useRouter();
  const { me } = useMe();
  // 2022/04/26 - markdown관련 헬퍼 함수들 - by 1-blue
  const { register, handleSubmit, watch, getValues, setValue } =
    useForm<WriteForm>();
  // 2022/04/27 - 태그가 들어갈 배열 - by 1-blue
  const [keywords, setKeywords] = useState<string[]>([]);
  // 2022/04/27 - 게시글 생성 함수 - by 1-blue
  const [createPost, { data: createPostResponse }] =
    useMutation<CreatePostResponse>({
      url: "/api/post",
    });
  // 2022/04/27 - 게시글 임시 생성 함수 - by 1-blue
  const [
    createTemporaryPost,
    { data: createTemporaryPostResponse },
    resetState,
  ] = useMutation<ICreateTemparoryPostResponse>({
    url: "/api/temp",
  });

  // 2022/04/27 - 게시글 생성 - by 1-blue
  const onCreatePost = useCallback(
    (body: WriteForm) => {
      if (!body.title) return toast.error("제목을 입력해주세요!");
      if (!body.contents) return toast.error("내용을 입력해주세요!");
      if (!confirm("정말 게시글을 생성하시겠습니까?")) return;

      createPost({
        ...body,
        keywords,
        tempPostIdx: createTemporaryPostResponse?.tempPostIdx,
      });
    },
    [createPost, keywords, createTemporaryPostResponse]
  );
  // 2022/04/27 - 게시글 임시 저장 - by 1-blue
  const onTemporarySave = useCallback(() => {
    const title = getValues("title");
    const contents = getValues("contents");

    if (!title) return toast.error("제목을 입력해주세요!");
    if (!contents) return toast.error("내용을 입력해주세요!");

    createTemporaryPost({
      title,
      contents,
      keywords,
      tempPostIdx: createTemporaryPostResponse?.tempPostIdx,
    });
  }, [getValues, keywords, createTemporaryPost, createTemporaryPostResponse]);

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

        const keyword = getValues("keyword").toLocaleLowerCase();
        if (!keyword) return;

        setKeywords((prev) => {
          if (prev.length >= 10) {
            toast.warning("태그는 최대 10개까지만 생성이 가능합니다.");
            return prev;
          }
          return [...prev, keyword].filter((v, i, arr) => arr.indexOf(v) === i);
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

  // 2022/04/27 - 게시글 생성 성공 시 toast + 페이지 이동 - by 1-blue
  useToastMessage({
    ok: createPostResponse?.ok,
    message: `"${createPostResponse?.title}" 게시글을 생성했습니다.`,
    go: `/${me?.name}/${createPostResponse?.title}`,
  });
  // 2022/04/27 - 게시글 임시 생성 성공 시 toast - by 1-blue
  useToastMessage({
    ok: createTemporaryPostResponse?.ok,
    message: `"${createTemporaryPostResponse?.title}" 게시글을 임시저장 했습니다.`,
    excute: resetState,
  });

  return (
    <>
      <article className="flex h-screen" onKeyDown={handleSave}>
        {/* 좌측 입력 영역 */}
        <section className="flex-1 dark:bg-zinc-800 bg-zinc-200 p-4">
          <form
            className="flex flex-col h-full"
            onSubmit={handleSubmit(onCreatePost)}
          >
            <input
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
                <li
                  key={keyword}
                  className="py-1 px-2 rounded-md mb-2 bg-zinc-500 text-white"
                >
                  <button
                    type="button"
                    onClick={onRemoveKeyword(keyword)}
                    tabIndex={-1}
                  >
                    {keyword}
                  </button>
                </li>
              ))}
            </ul>
            <textarea
              placeholder="당신의 이야기를 적어보세요..."
              className="p-4 bg-transparent focus:outline-none flex-1 resize-none"
              {...register("contents")}
            />
            <div className="flex space-x-2 dark:bg-zinc-700 p-4 -m-4">
              <button
                type="button"
                className="px-2 py-1 rounded-md hover:bg-zinc-400 transition-colors"
                onClick={onCancelCreatePost}
              >
                ◂ 나가기
              </button>
              <div className="flex-1" />
              <button
                type="button"
                className="px-2 py-1 rounded-md hover:bg-zinc-400 transition-colors"
                onClick={onTemporarySave}
              >
                임시저장
              </button>
              <button
                type="submit"
                className="px-2 py-1 rounded-md hover:bg-zinc-400 transition-colors"
              >
                출간하기
              </button>
            </div>
          </form>
        </section>

        {/* 우측 결과물 미리보기 영역 */}
        <section className="flex-1 hidden sm:inline-block overflow-auto">
          <h1 className="p-4 block text-5xl mb-4">{watch("title")}</h1>
          <Markdown markdown={watch("contents")} />
        </section>
      </article>
    </>
  );
};

export default Write;
