import { sync } from "glob";
import path from "path";
import getMatter, { type GrayMatterFile } from "gray-matter";
import fs from "fs";
import type { Post, PostData } from "@/types/post";
import { visit } from "unist-util-visit";
import type { Root } from "hast";

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
  const file = fs.readFileSync(
    path.join(POSTS_PATH, slug, "index.mdx"),
    "utf-8",
  );

  if (file) {
    return toPost(getMatter(file));
  }
  return undefined;
};

export const getPostByTitle = (title: string): Post | undefined => {
  const post = getAllPosts().find((p) => p.data.title === title);

  if (post) {
    return post;
  }
  return undefined;
};

export function rehypeImgTransformer() {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "img" && node.properties && node.properties.src) {
        // 여기서 img의 src를 원하는 대로 수정
        // node.properties.src = path.join("/posts", `${node.properties.src}`);
        node.properties.src = path.join(
          "/posts/how-does-v8-array-sort-work",
          `${node.properties.src}`,
        );
      }
    });
  };
}

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
    created: rawPostData.created,
    slug: rawPostData.slug,
    tags: [],
    summary: rawPostData.summary,
    draft: rawPostData.draft,
  };
};
