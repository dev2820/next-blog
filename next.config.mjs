/** @type {import('next').NextConfig} */
import withExportImages from "next-export-optimize-images";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
