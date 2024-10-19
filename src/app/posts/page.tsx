"use client";

import { PageHeading } from "@/components/PageHeading";
import {
  SearchResultRoot,
  SearchResultTitle,
  SearchResultDescription,
} from "@/components/search/SearchResult";
import { Tag } from "@/components/Tag";
import { useMount } from "@/hooks/use-mount";
import { Post } from "@/types/post";
import { cx } from "@/utils/cx";
import { isFailed, isNil } from "@/utils/predicate";
import { fetchPostListForSearch } from "@/utils/search";
import Link from "next/link";
import { MouseEvent, useCallback, useState } from "react";
const BASE_PATH = process.env.basePath ?? "";

const ALL_POSTS = "전체 보기";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>(ALL_POSTS);
  const filterOptions: [string, number][] = [
    [ALL_POSTS, posts.length],
    ...posts
      .map((p) => p.data.tags)
      .flat()
      .reduce(
        (map, tag) => map.set(tag, (map.get(tag) ?? 0) + 1),
        new Map<string, number>()
      )
      .entries(),
  ];
  const filterFn = useCallback(
    (post: Post) => {
      if (currentFilter === ALL_POSTS) {
        return true;
      }
      console.log(
        post.data.tags,
        currentFilter,
        post.data.tags.includes(currentFilter)
      );
      return post.data.tags.includes(currentFilter);
    },
    [currentFilter]
  );

  useMount(() => {
    const updatePosts = async () => {
      const result = await fetchPostListForSearch();
      if (isFailed(result)) {
        return;
      }

      const posts = result.value;
      setPosts(posts);
    };
    updatePosts();
  });

  const handleClickTag = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const filterOption = target.dataset["filterOption"];
    if (isNil(filterOption)) {
      return;
    }
    setCurrentFilter(filterOption);
  };
  return (
    <>
      <PageHeading>Posts</PageHeading>
      <ul className="flex flex-row gap-3 flex-wrap mb-4">
        {filterOptions.map(([filterOption, count]) => (
          <li key={filterOption}>
            <button onClick={handleClickTag} data-filter-option={filterOption}>
              <Tag
                theme={currentFilter === filterOption ? "primary" : "secondary"}
                active={currentFilter === filterOption}
                className={cx(
                  currentFilter === filterOption
                    ? "cursor-default"
                    : "cursor-pointer"
                )}
              >{`${filterOption} (${count})`}</Tag>
            </button>
          </li>
        ))}
      </ul>
      {/**
       * 정렬 기능
       */}

      <ul className="w-full">
        {posts.filter(filterFn).map((post) => (
          <li
            key={post.data.title}
            className="mb-4 last:mb-0 border-b first:border-t"
          >
            <SearchResultRoot className="p-4">
              <Link
                href={`/posts/${post.data.slug}`}
                className="hover:underline"
              >
                <SearchResultTitle>{post.data.title}</SearchResultTitle>
              </Link>
              <SearchResultDescription>
                {post.data.summary}
              </SearchResultDescription>
              <div className="mt-4 flex flex-row flex-wrap gap-1">
                {post.data.tags.map((tag) => (
                  <Link href={`${BASE_PATH}/tags/${tag}`} key={tag}>
                    <Tag theme="secondary">{tag}</Tag>
                  </Link>
                ))}
              </div>
            </SearchResultRoot>
          </li>
        ))}
      </ul>
    </>
  );
}
