/** @type {import('next').NextConfig} */
import config from "./config.js";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  env: {
    ...config,
    mode: process.env.MODE,
  },
  trailingSlash: true,
};

export default nextConfig;
