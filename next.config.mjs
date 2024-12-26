/** @type {import('next').NextConfig} */
import config from "./config.js";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  env: {
    ...config,
    NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE:
      process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE,
    NEXT_PUBLIC_NAVER_SEARCH_CONSOLE:
      process.env.NEXT_PUBLIC_NAVER_SEARCH_CONSOLE,
  },
  trailingSlash: true,
};

export default nextConfig;
