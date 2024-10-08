import { Post } from "@/types/post";
import { createSearch } from "@/utils/search";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMount } from "./use-mount";
import mockPosts from "@/__mocks__/post-list.json";

export const useSearchPosts = (
  // posts: Post[] = [],
  options: { keys: string[] }
) => {
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

  return searchFnRef.current;
};

async function fetchPostList() {
  if (process.env.NEXT_PUBLIC_MODE === "development") {
    const result = mockPosts;
    return result;
  }

  const result = await (await fetch("/next-blog/post-list.json")).json();
  return result;
}
