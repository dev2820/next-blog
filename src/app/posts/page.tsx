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
import { Select } from "terra-design-system/react";

const ALL_POSTS = "전체 보기";
const orderOptions = ["최신순", "오래된순"];
const compareFnTable = {
  // 최신순
  [orderOptions[0]]: (a: Post, b: Post) => {
    return a.data.published < b.data.published ? 1 : -1;
  },
  // 오래된순
  [orderOptions[1]]: (a: Post, b: Post) => {
    return a.data.published > b.data.published ? 1 : -1;
  },
};
export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>(ALL_POSTS);
  const [currentOrder, setCurrentOrder] = useState<string>(orderOptions[0]);
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
  const handleChangeSelect = (changedDetails: {
    value: string[];
    items: (object | string)[];
  }) => {
    const [value] = changedDetails.value;
    setCurrentOrder(value);
  };
  return (
    <>
      <PageHeading>Posts</PageHeading>
      <ul className="flex flex-row gap-3 flex-wrap mb-16">
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
      <div className="mb-4">
        <Select.Root
          className="w-36 ml-auto"
          items={orderOptions}
          size="sm"
          defaultValue={[orderOptions[0]]}
          onValueChange={handleChangeSelect}
        >
          {orderOptions.map((order) => (
            <Select.Item key={order} item={order}>
              {order}
            </Select.Item>
          ))}
        </Select.Root>
      </div>
      <ul className="w-full">
        {posts
          .filter(filterFn)
          .toSorted(compareFnTable[currentOrder])
          .map((post) => (
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
                    <Link href={`/tags/${tag}`} key={tag}>
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
