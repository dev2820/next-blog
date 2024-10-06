import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postDir = path.join(process.cwd(), "public/posts");
const path2out = path.join(process.cwd(), "out/posts");
const path2PostList = path.join(process.cwd(), "out/post-list.json");

const postNames = fs
  .readdirSync(postDir)
  .filter((p) => !p.startsWith("."))
  .filter((p) => p !== "README.md");

const posts = postNames.map((p) => {
  const mdxPath = path.join(path2out, p, "index.mdx");
  const mdxFile = fs.readFileSync(mdxPath, "utf8");

  return matter(mdxFile);
});

const generatePostList = (posts) => {
  const postList = posts.filter((p) => p.data.draft);

  fs.writeFileSync(path2PostList, JSON.stringify(postList), {
    encoding: "utf-8",
    flag: "w+",
  });
};

generatePostList(posts);
