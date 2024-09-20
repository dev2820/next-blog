/** @type {import('next').NextConfig} */
import withExportImages from "next-export-optimize-images";
import config from "./config.js";
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  env: {
    siteURL: config.siteURL,
  },
};

export default nextConfig;
