/** @type {import('next').NextConfig} */
import config from "./config.js";
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  env: {
    siteURL: config.siteURL,
  },
  basePath: "./",
};

export default nextConfig;
