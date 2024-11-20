// TODO: JSON-LD 적용

import { getAllPosts, getPostBySlug, getPostsByTag } from "@/utils/post";

type PageProps = {
  params: {
    tag: string;
  };
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tags = [
    ...posts
      .map((p) => p.data.tags)
      .flat()
      .reduce(
        (map, tag) => map.set(tag, (map.get(tag) ?? 0) + 1),
        new Map<string, number>()
      )
      .keys(),
  ];

  return tags.map((tag) => ({ tag: encodeURIComponent(tag) }));
}

// TODO: Metadata 적용
export async function generateMetadata({ params }: PageProps) {
  const { tag: _tag } = params;
  const tag = decodeURI(_tag);
  const posts = getPostsByTag(tag);

  // TODO: tag 페이지용 metadata
  // return {
  //   metadataBase: new URL(SITE_URL),
  //   title: `${TITLE} - ${post?.data.title}`,
  //   description: post?.data.summary,
  //   author: AUTHOR,
  //   alternates: {
  //     canonical: slug,
  //   },
  //   openGraph: {
  //     type: "article",
  //     locale: "ko_KR",
  //     url: slug,
  //     title: post?.data.title,
  //     description: post?.data.summary,
  //     images: [
  //       {
  //         url: path.join(basePath, post?.data.image ?? ""),
  //         width: 800,
  //         height: 600,
  //         alt: post?.data.title,
  //       },
  //     ],
  //     article: {
  //       publishedTime: post?.data.published,
  //       modifiedTime: post?.data.modified,
  //       authors: [GITHUB_URL],
  //       tags: post?.data.tags,
  //     },
  //   },
  // };
  return {};
}

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
