import { sync } from "glob";
import path from "path";
import getMatter, { type GrayMatterFile } from "gray-matter";
import fs from "fs";
import type { Post, PostData } from "@/types/post";

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
