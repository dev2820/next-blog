"use client";

import { useMount } from "@/hooks/use-mount";
import { createSearch } from "@/utils/post/search";
import Link from "next/link";
import {
  type ChangeEvent,
  ComponentProps,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import mockPosts from "@/__mocks__/post-list.json";
import { Input } from "terra-design-system/react";
import { cx } from "@/utils/cx";
import { SearchIcon, XIcon } from "lucide-react";

async function fetchPostList() {
  if (process.env.NEXT_PUBLIC_MODE === "development") {
    const result = mockPosts;
    return result;
  }

  const result = await (await fetch("/post-list.json")).json();
  return result;
}

export type SearchViewProps = ComponentProps<"div">;
export function SearchView(props: SearchViewProps) {
  const { className, ...rest } = props;
  /**
   * TODO: search 자료구조 만들기
   * TODO: search result 만들기
   * TODO: 태그 검색 만들기
   *
   */
  const [keyword, setKeyword] = useState<string>("");
  const searchEngineRef = useRef<{
    search: (keyword: string) => any;
  } | null>(null);
  const searchbarRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    searchbarRef.current?.focus();
  }, [searchbarRef.current]);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setKeyword(input);
  };

  const handleSearchKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const result = searchPost(keyword);
      // result가 있다면 특정화면 핸들링
      // result가 없다면 특정화면 핸들링
    }
  };

  const handleSearchCancelClick = () => {
    setKeyword("");
  };

  return (
    <div className={cx("flex flex-col items-center", className)} {...rest}>
      <form className="relative w-full max-w-[568px] text-white">
        <input
          type="search"
          placeholder="Type to search"
          ref={searchbarRef}
          className={cx(
            "w-full h-12 rounded-lg text-md bg-white/15 caret-white pl-11 pr-11 shadow-xl",
            "border-2 focus:outline-none border-transparent focus:border-primary duration-200"
          )}
          value={keyword}
          onChange={handleSearchInput}
          onKeyDown={handleSearchKeydown}
        />
        <SearchIcon
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 "
        />
        {keyword.length > 0 && (
          <button
            id="search-cancel-btn"
            className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-11 inline-flex justify-center place-items-center"
            type="button"
            onClick={handleSearchCancelClick}
          >
            <XIcon size={20} />
          </button>
        )}
      </form>
      {/**
       * 태그 검색
       * 태그 표시(w. 갯수)
       */}
      {/**
       * 검색 결과
       */}
      {/**
       * 이런 포스트는 어떠세요
       */}
    </div>
  );
}
