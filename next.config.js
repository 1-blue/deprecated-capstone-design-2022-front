const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "@src": path.resolve(__dirname, "src"),
        },
      },
    };
  },
  images: {
    domains: ["blelog.s3.ap-northeast-2.amazonaws.com", "k.kakaocdn.net"],
  },
};

module.exports = nextConfig;
