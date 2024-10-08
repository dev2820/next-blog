"use client";

import { useMount } from "@/hooks/use-mount";
import { type SearchResult } from "@/utils/search";
import Link from "next/link";
import {
  ComponentProps,
  ElementRef,
  ReactNode,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cx } from "@/utils/cx";
import type { Post } from "@/types/post";
import { delayFn } from "@/utils/delay";
import Image from "next/image";
import pepeSadImg from "@/assets/images/pepe-sad.png";
import { SearchInput } from "@/components/search/SearchInput";
import { useSearchPosts } from "@/hooks/use-search-posts";
import { useSearchQuery } from "@/hooks/use-search-query";
import mockPosts from "@/__mocks__/post-list.json";
import { Button } from "terra-design-system/react";

export default function SearchPage() {
  /**
   * TODO: 태그 검색 만들기
   *
   */
  const [posts, setPosts] = useState<Post[]>([]);
  const tagsMap = useMemo(() => {
    return posts
      .map((p) => p.data.tags)
      .flat()
      .reduce(
        (map, tag) => map.set(tag, (map.get(tag) ?? 0) + 1),
        new Map<string, number>()
      );
  }, [posts]);

  const searchInputRef = useRef<ElementRef<typeof SearchInput>>(null);
  const { query, debouncedQuery, updateQuery, isStale } = useSearchQuery("");
  const {
    search,
    isSearching,
    results: searchResults,
  } = useSearchPosts(posts, {
    keys: ["data.title", "data.tags", "data.summary", "content"],
  });

  const updatePosts = async () => {
    const postList = (await fetchPostList()) as Post[];
    setPosts(postList);
  };

  useEffect(() => {
    search(debouncedQuery);
  }, [debouncedQuery, search]);

  useMount(() => {
    updatePosts();
    delayFn(200, () => {
      searchInputRef.current?.focus();
    });
  });

  const handleChangeSearch = (query: string) => {
    updateQuery(query ?? "");
  };

  const handleClearSearch = () => {
    updateQuery("");
  };

  const handleClickSearchResult = () => {
    // search
  };

  const handleClickTag = () => {
    // search tag
  };

  return (
    <search className={cx("rounded-md flex flex-col items-center")}>
      <fieldset className="bg-gray-200 rounded-lg w-full px-4 pt-20 pb-10 flex flex-col place-items-center">
        <h2 className="text-5xl font-bold mb-8">Search</h2>
        <form
          className="w-full max-w-[568px] flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <SearchInput
            className="w-full h-11"
            placeholder="Type to search"
            value={query}
            onChangeSearch={handleChangeSearch}
            onClearSearch={handleClearSearch}
            ref={searchInputRef}
          />
          <div className="flex flex-row gap-3 mt-6 flex-wrap">
            {[...tagsMap.entries()].map(([tag, count]) => (
              <Button
                key={tag}
                size="xs"
                variant="outline"
                theme="blackAlpha"
                className="text-sm px-3"
                onClick={handleClickTag}
              >
                {tag} ({count})
              </Button>
            ))}
          </div>
        </form>
      </fieldset>
      <div className="text-left w-full">
        {isStale && debouncedQuery.length > 0 && !isSearching && (
          <>
            <small className="block mt-12 text-xl">
              키워드: <Highlight>&quot;{debouncedQuery}&quot;</Highlight>
            </small>
            <strong className="mt-1 block text-2xl font-bold">
              검색 결과: <Highlight>{searchResults.length}</Highlight>개의
              포스트
            </strong>
            <ul className="mt-4">
              {searchResults.map((sr) => (
                <li key={sr.refIndex} className="mb-4 last:mb-0">
                  <Link
                    href={`/posts/${sr.item.data.slug}`}
                    onClick={handleClickSearchResult}
                  >
                    <SearchResultSection
                      result={sr}
                      className="bg-gray-100 hover:bg-gray-200 duration-200"
                    ></SearchResultSection>
                  </Link>
                </li>
              ))}
            </ul>
            {searchResults.length === 0 && (
              <div className="flex flex-col place-items-center mt-16">
                <Image
                  src={pepeSadImg}
                  alt={"pepe-sad"}
                  width={192}
                  height={0}
                />
                <p className="text-lg mt-8">검색 결과가 없습니다요...</p>
              </div>
            )}
          </>
        )}
      </div>
      {/**
       * 이런 포스트는 어떠세요
       */}
    </search>
  );
}

type SearchResultSection = ComponentProps<"section"> & {
  result: SearchResult<Post>;
};
const SearchResultSection = (props: SearchResultSection) => {
  const { result, className, ...rest } = props;
  const { item, matches } = result;

  const titleMatch = matches?.find((match) => match.key === "data.title");
  const summaryMatch = matches?.find((match) => match.key === "data.summary");

  return (
    <section className={cx("rounded-md p-4", className)} {...rest}>
      {titleMatch && titleMatch.value && titleMatch.indices ? (
        <h3 className="text-2xl font-semibold">
          {splitByIndices(
            titleMatch.value,
            titleMatch.indices as [number, number][]
          ).map((token, idx) =>
            idx % 2 === 1 ? <Highlight key={idx}>{token}</Highlight> : token
          )}
        </h3>
      ) : (
        <h3 className="text-2xl">{item.data.title}</h3>
      )}
      {summaryMatch && summaryMatch.value && summaryMatch.indices ? (
        <p className="mt-4">
          {splitByIndices(
            summaryMatch.value,
            summaryMatch.indices as [number, number][]
          ).map((token, idx) =>
            idx % 2 === 1 ? <Highlight key={idx}>{token}</Highlight> : token
          )}
        </p>
      ) : (
        <p className="mt-4">{item.data.summary}</p>
      )}
    </section>
  );
};

const Highlight = ({ children }: { children: ReactNode }) => {
  return <span className="text-primary">{children}</span>;
};

function splitByIndices(str: string, pairs: [number, number][]) {
  const result = [];
  let lastIdx = 0;

  pairs.forEach((pair) => {
    const [startIdx, endIdx] = pair;

    // lastIdx부터 startIdx까지 자른 부분을 배열에 추가
    result.push(str.slice(lastIdx, startIdx));

    // startIdx부터 endIdx까지 자른 부분을 배열에 추가
    result.push(str.slice(startIdx, endIdx + 1));

    // 마지막 인덱스를 업데이트
    lastIdx = endIdx + 1;
  });

  // 마지막 범위부터 끝까지 남은 부분을 배열에 추가
  result.push(str.slice(lastIdx));

  return result;
}
async function fetchPostList() {
  if (process.env.NEXT_PUBLIC_MODE === "development") {
    const result = mockPosts;
    return result;
  }

  const result = await (await fetch("/next-blog/post-list.json")).json();
  return result;
}
