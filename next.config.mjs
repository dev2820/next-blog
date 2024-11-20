/** @type {import('next').NextConfig} */
import config from "./config.js";

const DEV_MODE = process.env.MODE === "development";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  env: {
    ...config,
    basePath: DEV_MODE ? "" : "/next-blog",
    mode: process.env.MODE,
  },
  basePath: DEV_MODE ? "" : "/next-blog",
  trailingSlash: true,
};

export default nextConfig;
