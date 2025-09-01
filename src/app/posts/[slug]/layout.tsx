// TODO: JSON-LD 적용
import path from "node:path";
import { type PropsWithChildren } from "react";

import { getAllPosts, getPostBySlug } from "@/utils/post";

const TITLE = process.env.title ?? "";
const AUTHOR = process.env.author ?? "";
const SITE_URL = process.env.siteURL ?? "";
const GITHUB_URL = process.env.github_URL ?? "";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts
    .filter((p) => !p.data.draft)
    .map((p) => ({
      slug: encodeURIComponent(p.data.slug),
    }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug: _slug } = params;
  const slug = decodeURIComponent(_slug);
  const post = getPostBySlug(slug);
  const basePath = `/posts/${slug}`;
  const isImageExist = !!post?.data.image;

  return {
    metadataBase: new URL(SITE_URL),
    title: `${TITLE} - ${post?.data.title}`,
    description: post?.data.summary,
    authors: { name: AUTHOR, url: GITHUB_URL },
    keywords: post?.data.tags,
    alternates: {
      canonical: slug,
    },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url: slug,
      title: `${TITLE} - ${post?.data.title ?? ""}`,
      description: post?.data.summary,
      siteName: TITLE,
      images: isImageExist
        ? [
            {
              url: path.join(basePath, post?.data.image ?? ""),
              width: 800,
              height: 600,
              alt: post?.data.title,
            },
          ]
        : undefined,
    },
  };
}

export default function PostLayout({ children }: PropsWithChildren) {
  return children;
}
