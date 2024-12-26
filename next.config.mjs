/** @type {import('next').NextConfig} */
import config from "./config.js";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  env: {
    ...config,
  },
  trailingSlash: true,
};

export default nextConfig;
