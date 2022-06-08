import Head from "next/head";
import { useRouter } from "next/router";

// util
import { combinePhotoUrl } from "@src/libs/util";

type Props = {
  title: string;
  description: string;
  photo?: string | null;
};

const HeadInfo = ({ title, description, photo }: Props) => {
  const { asPath } = useRouter();

  return (
    <Head>
      <title>blelog | {title}</title>
      <meta name="description" content={description} />

      {/* 카카오톡, 네이버 블로그 미리보기에 제공될 정보 */}
      <meta
        property="og:url"
        content={`https://${process.env.NEXT_PUBLIC_URL}${asPath}`}
      />
      <meta property="og:title" content={`blelog | ${title}`} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={
          photo
            ? combinePhotoUrl(photo)
            : `https://${process.env.NEXT_PUBLIC_URL}/temporary.jpg`
        }
      />

      {/* 트위터 */}
      <meta name="twitter:card" content={`blelog | ${title}\n${description}`} />
      <meta name="twitter:title" content={`blelog | ${title}`} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={
          photo
            ? combinePhotoUrl(photo)
            : `https://${process.env.NEXT_PUBLIC_URL}/logo.svg`
        }
      />
    </Head>
  );
};

export default HeadInfo;
