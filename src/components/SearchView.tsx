"use client";

import { useMount } from "@/hooks/use-mount";
import { createSearch } from "@/utils/search";
import Link from "next/link";
import {
  type ChangeEvent,
  ComponentProps,
  ElementRef,
  FormEvent,
  ReactNode,
  useRef,
  useState,
} from "react";
import mockPosts from "@/__mocks__/post-list.json";
import { Button, IconButton } from "terra-design-system/react";
import { cx } from "@/utils/cx";
import { SearchIcon, XIcon } from "lucide-react";
import { useScreen } from "@/hooks/use-screen";
import type { Post } from "@/types/post";
import { FuseResult, FuseResultMatch } from "fuse.js";
import { delayFn } from "@/utils/delay";
import Image from "next/image";
import pepeSadImg from "@/assets/images/pepe-sad.png";
import { SearchInput } from "@/components/search/SearchInput";
import { isNil } from "@/utils/predicate";

async function fetchPostList() {
  if (process.env.NEXT_PUBLIC_MODE === "development") {
    const result = mockPosts;
    return result;
  }

  const result = await (await fetch("/next-blog/post-list.json")).json();
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
  const [lastKeyword, setLastKeyword] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<FuseResult<Post>[]>([]);
  const searchInputRef = useRef<ElementRef<typeof SearchInput>>(null);

  const searchEngineRef = useRef<{
    search: (keyword: string) => FuseResult<Post>[];
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
    delayFn(200, () => {
      searchInputRef.current?.focus();
    });
  });

  const handleChangeSearch = (keyword: string) => {
    if (keyword === "") {
      setSearchResults([]);
      setLastKeyword("");
    }
    setKeyword(keyword ?? "");
  };

  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const results = searchPost(keyword);
    setLastKeyword(keyword);
    if (results) {
      setSearchResults(results);
    }
  };

  const handleClickSearchResult = () => {
    onClickSearchResult?.();
  };

  return (
    <div className={cx("flex flex-col items-center", className)} {...rest}>
      <form
        className="w-full max-w-[568px] text-white flex flex-row gap-4"
        onSubmit={handleSubmitSearch}
      >
        <div className="relative flex-1">
          <SearchInput
            className="w-full h-11"
            placeholder="Type to search"
            initialFocus
            onChangeSearch={handleChangeSearch}
            ref={searchInputRef}
          />
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
      <div className="text-left w-full max-w-[568px] text-white">
        {lastKeyword && (
          <>
            <p className="mt-16 text-xl">
              <Highlight>{lastKeyword}</Highlight> 검색 결과:{" "}
              <Highlight>{searchResults.length}</Highlight>개의 포스트
            </p>
            <ul className="mt-4">
              {searchResults.map((sr) => (
                <li key={sr.refIndex}>
                  <Link
                    href={`/posts/${sr.item.data.slug}`}
                    onClick={handleClickSearchResult}
                  >
                    <SearchResult
                      result={sr}
                      className="hover:bg-white/20 duration-200"
                    ></SearchResult>
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
  result: FuseResult<Post>;
};
const SearchResult = (props: SearchResultSection) => {
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
