/** @type {import('next').NextConfig} */
import config from "./config.js";

const DEV_MODE = process.env.NODE_ENV === "development";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  env: {
    ...config,
    basePath: DEV_MODE ? "" : "/next-blog",
  },
  basePath: DEV_MODE ? "" : "/next-blog",
};

export default nextConfig;
