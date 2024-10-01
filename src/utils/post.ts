import { sync } from "glob";
import path from "path";
import getMatter, { type GrayMatterFile } from "gray-matter";
import fs from "fs";
import type { Post, PostData } from "@/types/post";
import { TableOfContentsItem } from "@/types/post/table-of-contents";

const BASE_PATH = "/public/posts";
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

export const getAllPostsPath = () => {
  const postPaths: string[] = sync(`${POSTS_PATH}/**/index.mdx`);
  return postPaths;
};

export const getAllPosts = () => {
  const postPaths: string[] = sync(`${POSTS_PATH}/**/index.mdx`);
  return postPaths
    .map((p) => fs.readFileSync(p, "utf-8"))
    .map((file) => getMatter(file))
    .map(toPost);
};

export const getAllPostsData = () => {
  const postPaths: string[] = sync(`${POSTS_PATH}/**/index.mdx`);
  return postPaths
    .map((p) => fs.readFileSync(p, "utf-8"))
    .map((file) => getMatter(file))
    .map(({ data }) => toPostData(data));
};

export const getPostByPath = (postPath: string): Post | undefined => {
  const file = fs.readFileSync(postPath, "utf-8");

  if (file) {
    return toPost(getMatter(file));
  }
  return undefined;
};

export const getPostBySlug = (slug: string): Post | undefined => {
  const post = getAllPosts().find((p) => p.data.slug === slug);

  return post;
};

export const getPostByTitle = (title: string): Post | undefined => {
  const post = getAllPosts().find((p) => p.data.title === title);

  if (post) {
    return post;
  }
  return undefined;
};

const toPost = (rawPost: GrayMatterFile<string>): Post => {
  const { data, content } = rawPost;

  return {
    data: toPostData(data),
    content,
  };
};

const toPostData = (rawPostData: GrayMatterFile<string>["data"]): PostData => {
  return {
    title: rawPostData.title,
    published: rawPostData.published,
    modified: rawPostData.modified,
    slug: rawPostData.slug,
    tags: rawPostData.tags ?? [],
    summary: rawPostData.summary,
    draft: rawPostData.draft,
    image: rawPostData.image,
  };
};

export const generateTOC = (markdown: string): TableOfContentsItem[] => {
  // Split the markdown content by lines
  const lines = markdown.split("\n");
  const toc: TableOfContentsItem[] = [];

  // Regular expression to match headers (##, ###, etc.)
  const headerRegex = /^(#{2,6})\s+(.+)$/;

  lines.forEach((line) => {
    const match = line.match(headerRegex);
    if (match) {
      const level = Number(match[1].length); // Number of # characters
      const content = match[2].trim(); // Extract header content
      const slug =
        "#" +
        content
          .toLowerCase()
          .replace(
            /[^\w\s\u4E00-\u9FFF\uAC00-\uD7A3\u3130-\u318F\u3040-\u30FF\u00C0-\u024F\u1E00-\u1EFF-]/g,
            ""
          ) // Remove special characters
          .replace(/\s+/g, "-"); // Replace spaces with hyphens

      toc.push({ level, content, slug });
    }
  });

  return toc;
};
