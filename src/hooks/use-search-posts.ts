import { Post } from "@/types/post";
import { createSearch, SearchResult } from "@/utils/search";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useMount } from "./use-mount";
import mockPosts from "@/__mocks__/post-list.json";

export const useSearchPosts = (
  // posts: Post[] = [],
  options: { keys: string[] }
) => {
  const [searchResults, setSearchResults] = useState<SearchResult<Post>[]>([]);
  const [isSearching, startTransition] = useTransition();
  const searchFnRef = useRef<ReturnType<typeof createSearch<Post>> | null>(
    null
  );

  const updatePostList = async () => {
    const postList = (await fetchPostList()) as Post[];

    searchFnRef.current = createSearch<Post>(postList, {
      ...options,
    });
  };

  useMount(() => {
    updatePostList();
  });

  const search = useCallback((keyword: string) => {
    if (searchFnRef.current) {
      const result = searchFnRef.current(keyword);
      startTransition(() => {
        setSearchResults(result);
      });
    }
  }, []);

  return {
    search,
    isSearching,
    results: searchResults,
  };
};

async function fetchPostList() {
  if (process.env.NEXT_PUBLIC_MODE === "development") {
    const result = mockPosts;
    return result;
  }

  const result = await (await fetch("/next-blog/post-list.json")).json();
  return result;
}
