import { Post } from "@/types/post";
import { createSearch, SearchResult } from "@/utils/search";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";

export const useSearchPosts = (
  posts: Post[] = [],
  options: { keys: string[] }
) => {
  const [searchResults, setSearchResults] = useState<SearchResult<Post>[]>([]);
  const [isSearching, startTransition] = useTransition();
  const searchFnRef = useRef<ReturnType<typeof createSearch<Post>> | null>(
    null
  );

  useEffect(() => {
    searchFnRef.current = createSearch<Post>(posts, {
      ...options,
    });
  }, [options, posts]);

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
