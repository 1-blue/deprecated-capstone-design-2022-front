import Head from "next/head";
import { useRouter } from "next/router";

// util
import { combinePhotoUrl } from "@src/libs";

type Props = {
  title: string;
  description: string;
  photo?: string | null;
};

const HeadInfo = ({ title, description, photo }: Props) => {
  const { asPath } = useRouter();

  const path = photo
    ? combinePhotoUrl(photo)
    : `https://${process.env.NEXT_PUBLIC_BASE_URL}/logo.jpg`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* 카카오톡, 네이버 블로그 미리보기에 제공될 정보 */}
      <meta
        property="og:url"
        content={`https://${process.env.NEXT_PUBLIC_BASE_URL}${asPath}`}
      />
      <meta property="og:title" content={`${title}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={path} />

      {/* 트위터 */}
      <meta name="twitter:card" content={`${title}\n${description}`} />
      <meta name="twitter:title" content={`${title}`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={path} />
    </Head>
  );
};

export default HeadInfo;
