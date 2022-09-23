/**
 * 2022/09/23 - 이미지 경로 붙여주는 헬퍼함수 - by 1-blue
 * @param path 이미지 후반부 경로
 * @returns "aws-s3"의 전체 이미지 경로
 */
export const combinePhotoUrl = (path: string) =>
  process.env.NEXT_PUBLIC_PHOTO_BASE_URL + "/" + path;

// 2022/03/21 - 나열된 클래스명을 공백기준으로 합친 문자열로 만들어주는 헬퍼함수 - by 1-blue
export const combineClassNames = (...classname: string[]) =>
  classname.join(" ");

// 2022/05/04 - 문장에서 제목인 단어만 골라서 단어와 크기( h1 ~ h6 ) 객체로 반환 - by 1-blue
export const getTitleList = (sentence: string) => {
  const titleListArray = [
    ...sentence.matchAll(
      /((?<=^[\s]*#{1}\s).+)|((?<=^[\s]*#{2}\s).+)|((?<=^[\s]*#{3}\s).+)|((?<=^[\s]*#{4}\s).+)|((?<=^[\s]*#{5}\s).+)|((?<=^[\s]*#{6}\s).+)/gm
    ),
  ];

  const titleList: { text: string; size: number }[] = [];

  titleListArray.map((title) => {
    // #, ##, ... ###### 중 어느것인지 판단해서 그 크기를 0(h1) ~ 5(h6)로 반환함
    const size = title.slice(1).findIndex((v) => v?.length > 0);

    titleList.push({ text: title[0], size });
  });

  return titleList;
};

// 2022/05/11 - 스로틀 헬퍼 함수 - by 1-blue
export const throttleHelper = (callback: () => void, waitTime: number) => {
  let timerId: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback();
      timerId = null;
    }, waitTime);
  };
};

// 2022/05/11 - 디바운스 헬퍼 함수 - by 1-blue
export const dedounceHelper = (callback: () => void, waitTime: number) => {
  let timerId: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback();
      timerId = null;
    }, waitTime);
  };
};
