"use client";

import { useMount } from "@/hooks/use-mount";
import { createSearch } from "@/utils/post/search";
import Link from "next/link";
import {
  type ChangeEvent,
  ComponentProps,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import mockPosts from "@/__mocks__/post-list.json";
import { Button, IconButton, Input } from "terra-design-system/react";
import { cx } from "@/utils/cx";
import { SearchIcon, XIcon } from "lucide-react";
import { useScreen } from "@/hooks/use-screen";

async function fetchPostList() {
  if (process.env.NEXT_PUBLIC_MODE === "development") {
    const result = mockPosts;
    return result;
  }

  const result = await (await fetch("/post-list.json")).json();
  return result;
}

export type SearchViewProps = ComponentProps<"div"> & {
  onClickSearchResult?: () => void;
};
export function SearchView(props: SearchViewProps) {
  const { className, onClickSearchResult, ...rest } = props;
  /**
   * TODO: search 자료구조 만들기
   * TODO: search result 만들기
   * TODO: 태그 검색 만들기
   *
   */
  const { isMobile } = useScreen();
  const [keyword, setKeyword] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchEngineRef = useRef<{
    search: (keyword: string) => any;
  } | null>(null);

  const readyForSearch = async () => {
    const postList = await fetchPostList();
    searchEngineRef.current = {
      search: createSearch(postList),
    };
  };

  const searchPost = (keyword: string) => {
    if (searchEngineRef.current) {
      return searchEngineRef.current.search(keyword);
    }
  };

  useMount(() => {
    readyForSearch();
  });

  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setKeyword(input);
  };

  const handleClickSearchClear = () => {
    setKeyword("");
  };

  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const results = searchPost(keyword);
    setSearchResults(results);
    console.log(results);
  };

  const handleClickSearchResult = () => {
    console.log("?");
    onClickSearchResult?.();
  };

  return (
    <div className={cx("flex flex-col items-center", className)} {...rest}>
      <form
        className="w-full max-w-[568px] text-white flex flex-row gap-4"
        onSubmit={handleSubmitSearch}
      >
        <div className="relative flex-1">
          <input
            type="search"
            placeholder="Type to search"
            autoFocus
            className={cx(
              "w-full h-11 rounded-lg text-md bg-white/15 caret-white pl-11 pr-11 shadow-xl",
              "border-2 focus:outline-none border-transparent focus:border-primary duration-200"
            )}
            value={keyword}
            onChange={handleInputSearch}
          />
          <SearchIcon
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2"
          />
          {keyword.length > 0 && (
            <button
              id="search-cancel-btn"
              className="absolute right-0 top-1/2 -translate-y-1/2 h-11 w-11 inline-flex justify-center place-items-center"
              type="button"
              onClick={handleClickSearchClear}
            >
              <XIcon size={20} />
            </button>
          )}
        </div>
        {isMobile ? (
          <IconButton
            size="lg"
            theme="primary"
            className="flex-none"
            type="submit"
          >
            <SearchIcon size={24} />
          </IconButton>
        ) : (
          <Button
            size="lg"
            theme="primary"
            className="flex-none"
            type="submit"
            leftIcon={<SearchIcon size={20} />}
          >
            Search
          </Button>
        )}
        {/**
         * 태그 검색
         * 태그 표시(w. 갯수)
         */}
      </form>
      <div className="text-left w-full max-w-[568px]">
        {/**
         * 검색 결과
         * - 목룍 UI
         * - 검색 결과가 없을 때 화면
         */}
        <ul className="mt-16">
          {searchResults.map((sr) => (
            <li key={sr.refIndex}>
              <Link
                href={`/posts/${sr.item.slug}`}
                onClick={handleClickSearchResult}
              >
                <div className="bg-white/15">{sr.item.title}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/**
       * 이런 포스트는 어떠세요
       */}
    </div>
  );
}
