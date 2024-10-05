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
  const { data } = matter(mdxFile);
  const htmlPath = path.join(path2out, `${data.slug}.html`);
  const htmlFile = fs.readFileSync(htmlPath, "utf8");

  return {
    data,
    content: htmlFile,
  };
});

const generatePostList = (posts) => {
  const postToListItem = (p) => ({
    title: p.data.title,
    slug: p.data.slug,
    tags: p.data.tags ?? [],
    content: p.content,
  });
  const postList = posts.map(postToListItem);

  fs.writeFileSync(path2PostList, JSON.stringify(postList), {
    encoding: "utf-8",
    flag: "w+",
  });
};

generatePostList(posts);
