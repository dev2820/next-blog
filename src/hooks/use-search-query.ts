import { useCallback, useState } from "react";
import { useDebounce } from "./use-debounce";

export const useSearchQuery = (defaultValue: string = "") => {
  const [query, setQuery] = useState<string>(defaultValue);
  const debouncedQuery = useDebounce(query, 300);
  const isStale = query === debouncedQuery;

  const updateQuery = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  return {
    query,
    debouncedQuery,
    isStale,
    updateQuery,
  };
};
