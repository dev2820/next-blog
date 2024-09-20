/** @type {import('next').NextConfig} */
import config from "./config.js";
console.log(process.env.NODE_ENV);
const DEV_MODE = process.env.NODE_ENV === "development";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  env: {
    siteURL: config.siteURL,
    basePath: DEV_MODE ? "" : "/next-blog",
  },
  basePath: DEV_MODE ? "" : "/next-blog",
};

export default nextConfig;
