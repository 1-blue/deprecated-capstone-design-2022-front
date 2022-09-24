namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    DATABASE_URL: string;
    SECRET: string;

    NEXT_PUBLIC_SERVER_URL: string;
    NEXT_PUBLIC_PHOTO_BASE_URL: string;

    NEXT_PUBLIC_BUCKET_NAME: string;

    JSLOG_AWS_REGION: string;
    JSLOG_AWS_ACCESS_KEY: string;
    JSLOG_AWS_SECRET_KEY: string;

    KAKAO_ID: string;
    KAKAO_SECRET: string;
  }
}
