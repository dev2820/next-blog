import type { MetadataRoute } from "next";

const siteURL = process.env.siteURL!;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: siteURL + "/sitemap.xml",
  };
}
