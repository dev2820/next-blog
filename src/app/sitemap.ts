import { MetadataRoute } from "next";
import { getAllPostsData, getAllTags } from "@/utils/post";
const siteURL = process.env.siteURL!;
const defaultSiteMap: MetadataRoute.Sitemap = [
  {
    url: siteURL + "/",
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  },
  {
    url: siteURL + "/tags",
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.7,
  },
  {
    url: siteURL + "/posts",
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.7,
  },
  {
    url: siteURL + "/search",
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.7,
  },
  {
    url: siteURL + "/contact",
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.7,
  },
];
const tagsSiteMap: MetadataRoute.Sitemap = getAllTags().map(([tagName, _]) => {
  return {
    url: `${siteURL}/tags/${encodeURI(tagName)}/`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.7,
  };
});
const postsSiteMap: MetadataRoute.Sitemap = getAllPostsData().map((post) => {
  return {
    url: `${siteURL}/posts/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.7,
  };
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [...defaultSiteMap, ...tagsSiteMap, ...postsSiteMap];
}
