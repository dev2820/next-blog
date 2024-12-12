"use client";

import { PageHeading } from "@/components/PageHeading";
import { SearchResult } from "@/components/search/SearchResult";
import { Tag } from "@/components/Tag";
import { useMount } from "@/hooks/use-mount";
import { Post } from "@/types/post";
import { cx } from "@/utils/cx";
import { isFailed, isNil } from "@/utils/predicate";
import { fetchPostListForSearch } from "@/utils/search";
import { MouseEvent, useCallback, useState } from "react";
import { Select, Skeleton } from "terra-design-system/react";

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
  const [isFetching, setIsFetching] = useState<boolean>(true);
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
      setIsFetching(false);
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
      <ul className="flex flex-row gap-2.5 flex-nowrap mb-16 overflow-x-scroll tablet:flex-wrap tablet:h-auto tablet:overflow-x-hidden">
        {isFetching && (
          <>
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-16 rounded-full" />
            <Skeleton className="h-8 w-28 rounded-full" />
          </>
        )}
        {!isFetching &&
          filterOptions.map(([filterOption, count]) => (
            <li key={filterOption} className="snap-center flex-none">
              <button
                onClick={handleClickTag}
                data-filter-option={filterOption}
              >
                <Tag
                  theme={
                    currentFilter === filterOption ? "primary" : "secondary"
                  }
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
        {isFetching && (
          <>
            <li className="mb-4">
              <Skeleton className="h-36 w-full" />
            </li>
            <li>
              <Skeleton className="h-36 w-full" />
            </li>
          </>
        )}
        {!isFetching &&
          posts
            .filter(filterFn)
            .toSorted(compareFnTable[currentOrder])
            .map((post) => (
              <li key={post.data.title} className="mb-16 last:mb-0">
                <SearchResult post={post} />
              </li>
            ))}
      </ul>
    </>
  );
}
