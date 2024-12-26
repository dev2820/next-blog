/** @type {import('next').NextConfig} */
import config from "./config.js";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  env: {
    ...config,
    NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE:
      process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE,
  },
  rewrites: [
    { source: "/sitemap.xml", destination: "/sitemap.xml" },
    { source: "/robots.txt", destination: "/robots.txt" },
    { source: "/((?!sitemap\\.xml|robots\\.txt).*)", destination: "/" },
  ],
  trailingSlash: true,
};

export default nextConfig;
