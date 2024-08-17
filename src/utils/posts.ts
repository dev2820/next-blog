import { sync } from "glob";
import path from "path";
import matter from "gray-matter";
import fs from "fs";

const BASE_PATH = "/posts";
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

export const getAllPostsPath = () => {
  const postPaths: string[] = sync(`${POSTS_PATH}/**/*.mdx`);
  return postPaths;
};

export const getPostByPath = (postPath: string) => {
  const file = fs.readFileSync(postPath, "utf-8");

  return matter(file);
};

export const getPostByTitle = (title: string) => {
  /**
   * TODO: title로 post검색하는 기능 구현하기
   */
  // const file = fs.readFileSync(postPath, "utf-8");
  return undefined;
  // return matter(file);
};
