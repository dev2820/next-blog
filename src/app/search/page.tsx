"use client";

import { useMount } from "@/hooks/use-mount";
import { createSearch } from "@/utils/post/search";
import Link from "next/link";
import { type ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import mockPosts from "@/__mocks__/post-list.json";
import { Input } from "terra-design-system/react";

async function fetchPostList() {
  if (process.env.NEXT_PUBLIC_MODE === "development") {
    const result = mockPosts;
    return result;
  }

  const result = await (await fetch("/post-list.json")).json();
  return result;
}

export default function SearchPage() {
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

  const handleKeywordInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setKeyword(input);
  };

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const result = searchPost(keyword);
      // result가 있다면 특정화면 핸들링
      // result가 없다면 특정화면 핸들링
    }
  };

  return (
    <>
      {/**
       * 검색바
       */}
      <Input
        type="search"
        value={keyword}
        onChange={handleKeywordInput}
        onKeyDown={handleSearch}
      />
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
    </>
  );
}
