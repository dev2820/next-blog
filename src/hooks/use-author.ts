import type { Author } from "@/types/author";
import { fetchAuthor } from "@/utils/author";
import { isFailed, isNil } from "@/utils/predicate";
import { useEffect, useState } from "react";

const GITHUB_ID = process.env.githubId;

export const useAuthor = () => {
  const [author, setAuthor] = useState<Author | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const updateAuthor = async () => {
    if (isNil(GITHUB_ID)) {
      return;
    }

    const result = await fetchAuthor(GITHUB_ID);
    if (isFailed(result)) {
      // error handling
      return;
    }

    setAuthor(result.value);
    setIsFetching(false);
  };

  useEffect(() => {
    updateAuthor();
  }, []);

  return {
    author,
    isFetching,
  };
};
