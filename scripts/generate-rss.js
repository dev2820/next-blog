import { Feed } from "feed";
import config from "../config.js";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postDir = path.join(process.cwd(), "public/posts");
const outDir = path.join(process.cwd(), "out/posts");

function isDirectorySync(path) {
  try {
    const stats = fs.statSync(path); // 경로 상태 정보 가져오기
    return stats.isDirectory(); // 디렉토리인지 확인
  } catch (error) {
    console.error(`Error checking path: ${path}`, error);
    return false; // 경로가 존재하지 않거나 오류 발생 시 false 반환
  }
}

const postNames = fs
  .readdirSync(postDir)
  .filter((p) => !p.startsWith("."))
  .filter((p) => !p.startsWith("_"))
  .filter((p) => isDirectorySync(path.join(postDir, p)));

const posts = postNames
  .map((p) => {
    const mdxPath = path.join(postDir, p, "index.mdx");
    const mdxFile = fs.readFileSync(mdxPath, "utf8");
    const { data } = matter(mdxFile);

    return {
      data,
    };
  })
  .filter((p) => !p.data.draft)
  .map((p) => {
    const htmlPath = path.join(outDir, `${p.data.slug}/index.html`);
    const htmlFile = fs.readFileSync(htmlPath, "utf8");

    return {
      data: p.data,
      content: htmlFile,
    };
  });
/**
 * @see https://github.com/jpmonette/feed
 */
const feed = new Feed({
  title: config.title,
  description: config.description,
  id: config.siteURL,
  link: config.siteURL,
  language: config.language,
  image: config.image,
  favicon: config.favicon,
  copyright: `All rights reserved ${new Date().getFullYear()}, ${
    config.author
  }(${config.nickname})`,
  author: {
    name: config.author,
    email: config.email,
    link: config.cv,
  },
  feedLinks: {
    rss2: `${config.siteURL}/rss.xml`,
    json: `${config.siteURL}/feed.json`,
    atom: `${config.siteURL}/atom.xml`,
  },
});

posts.forEach((post) => {
  feed.addItem({
    title: post.data.title,
    id: post.data.slug,
    link: `${config.siteURL}${post.data.slug}`,
    description: post.data.description,
    content: post.content,
    author: [
      {
        name: config.author,
        email: config.email,
        link: config.cv,
      },
    ],
    date: new Date(post.data.published),
    image:
      post.data.image &&
      path.join(config.siteURL, post.data.slug, post.data.image),
    category: post.data.tags?.map((tag) => ({ name: tag })),
  });
});

feed.addCategory("Technologie");

// Output: RSS 2.0
fs.writeFileSync("out/rss.xml", feed.rss2(), "utf-8");
// Output: Atom 1.0
fs.writeFileSync("out/atom.xml", feed.atom1(), "utf-8");
// Output: JSON Feed 1.0
fs.writeFileSync("out/feed.json", feed.json1(), "utf-8");

console.log("generate: rss generate finished");
