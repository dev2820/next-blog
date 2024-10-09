/**
 * TODO: tag 꾸미기
 * TODO: tag skeleton 애니메이션
 */
import { useMount } from "@/hooks/use-mount";
import Link from "next/link";
import { useMemo, useState } from "react";
import { cx } from "@/utils/cx";
import type { Post } from "@/types/post";
import { fetchPostListForSearch } from "@/utils/search";
import { isFailed } from "@/utils/predicate";
import { Skeleton } from "terra-design-system/react";
import { getPostsByTag } from "@/utils/post";

type PageProps = {
  params: {
    tag: string;
  };
};

export default async function TagPage({ params }: PageProps) {
  const { tag } = params;
  const posts = getPostsByTag(tag);
  const taggedPosts = useMemo(() => {
    return posts.filter((p) => p.data.tags.includes(tag));
  }, [posts]);

  return (
    <div className={cx("rounded-md flex flex-col items-center")}>
      <h2 className="text-5xl font-bold mb-8">Tag: {tag}</h2>
      <ul>
        {taggedPosts.map((post, idx) => (
          <li key={post.data.title}>
            <Link href={`/posts/${post.data.slug}`}>{post.data.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
