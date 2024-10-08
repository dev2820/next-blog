"use client";

import { useMount } from "@/hooks/use-mount";
import { type SearchResult } from "@/utils/search";
import Link from "next/link";
import {
  ComponentProps,
  ElementRef,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { cx } from "@/utils/cx";
import type { Post } from "@/types/post";
import { delayFn } from "@/utils/delay";
import Image from "next/image";
import pepeSadImg from "@/assets/images/pepe-sad.png";
import { SearchInput } from "@/components/search/SearchInput";
import { useSearchPosts } from "@/hooks/use-search-posts";
import { useSearchQuery } from "@/hooks/use-search-query";

export type SearchViewProps = ComponentProps<"div"> & {
  onClickSearchResult?: () => void;
};
export function SearchView(props: SearchViewProps) {
  const { className, onClickSearchResult, ...rest } = props;
  /**
   * TODO: 태그 검색 만들기
   *
   */

  const searchInputRef = useRef<ElementRef<typeof SearchInput>>(null);
  const { query, debouncedQuery, updateQuery, isStale } = useSearchQuery("");
  const {
    search,
    isSearching,
    results: searchResults,
  } = useSearchPosts({
    keys: ["data.title", "data.tags", "data.summary", "content"],
  });

  useEffect(() => {
    search(debouncedQuery);
  }, [debouncedQuery, search]);

  useMount(() => {
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
    onClickSearchResult?.();
  };

  return (
    <div className={cx("flex flex-col items-center", className)} {...rest}>
      <form
        className="w-full max-w-[568px] text-white flex flex-row gap-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <SearchInput
          className="flex-1 w-full h-11"
          placeholder="Type to search"
          value={query}
          onChangeSearch={handleChangeSearch}
          onClearSearch={handleClearSearch}
          ref={searchInputRef}
        />
        {/**
         * 태그 검색
         * 태그 표시(w. 갯수)
         */}
      </form>
      <div className="text-left w-full max-w-[568px] text-white">
        {isStale && debouncedQuery.length > 0 && !isSearching && (
          <>
            <p className="mt-16 text-xl">
              <Highlight>{debouncedQuery}</Highlight> 검색 결과:{" "}
              <Highlight>{searchResults.length}</Highlight>개의 포스트
            </p>
            <ul className="mt-4">
              {searchResults.map((sr) => (
                <li key={sr.refIndex}>
                  <Link
                    href={`/posts/${sr.item.data.slug}`}
                    onClick={handleClickSearchResult}
                  >
                    <SearchResultSection
                      result={sr}
                      className="hover:bg-white/20 duration-200"
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
    </div>
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
    <section className={cx("bg-white/15 rounded-md p-4", className)} {...rest}>
      {titleMatch && titleMatch.value && titleMatch.indices ? (
        <h3 className="text-2xl">
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
