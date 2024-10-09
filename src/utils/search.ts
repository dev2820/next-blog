import type { Post } from "@/types/post";
import Fuse from "fuse.js";
import mockPosts from "@/__mocks__/post-list.json";
import { Failed, Result, Success } from "@/types/monad";

export async function fetchPostListForSearch() {
  try {
    if (process.env.NEXT_PUBLIC_MODE === "development") {
      const result = mockPosts;
      return {
        isFailed: false,
        value: result,
        error: null,
      } as Success<Post[]>;
    }

    const result = await (await fetch("/next-blog/post-list.json")).json();

    return {
      isFailed: false,
      value: result as Post[],
      error: null,
    } as Success<Post[]>;
  } catch (err) {
    return {
      isFailed: true,
      value: null,
      error: err as Error,
    } as Failed<Error>;
  }
}

/**
 * TODO: fuse result 타입 개선하기 (fuse 숨기기)
 */
export type SearchResult<T> = {
  item: T;
  refIndex: number;
  score?: number;
  matches?: {
    indices: [number, number][];
    key?: string;
    refIndex?: number;
    value?: string;
  }[];
};
export const createSearch = <T>(
  list: T[],
  options?: {
    keys: string[];
  }
): ((keyword: string) => SearchResult<T>[]) => {
  /**
   * @see https://www.fusejs.io/api/options.html
   */
  const fuse = new Fuse(list, {
    includeScore: true,
    includeMatches: true,
    shouldSort: true,
    minMatchCharLength: 2,
    findAllMatches: false,
    ...options,
  });

  return (keyword: string) => {
    return fuse.search(keyword) as SearchResult<T>[];
  };
};

export const search = <T>(
  query: string,
  list: T[],
  options?: {
    keys: string[];
  }
): SearchResult<T>[] => {
  const searchFn = createSearch<T>(list, options);

  return searchFn(query);
};
/**
 * 초성검색 기능 지원을 위해 한글의 자모를 분리한 문자열을 반환합니다.
 * @param str 한글이 포함된 문자열
 * @returns 자모가 분리된 str
 */
const decomposeHangul = (str: string | readonly string[]) => {
  const chosung = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ] as const;
  const jungsung = [
    "ㅏ",
    "ㅐ",
    "ㅑ",
    "ㅒ",
    "ㅓ",
    "ㅔ",
    "ㅕ",
    "ㅖ",
    "ㅗ",
    "ㅘ",
    "ㅙ",
    "ㅚ",
    "ㅛ",
    "ㅜ",
    "ㅝ",
    "ㅞ",
    "ㅟ",
    "ㅠ",
    "ㅡ",
    "ㅢ",
    "ㅣ",
  ] as const;
  const jongsung = [
    "",
    "ㄱ",
    "ㄲ",
    "ㄳ",
    "ㄴ",
    "ㄵ",
    "ㄶ",
    "ㄷ",
    "ㄹ",
    "ㄺ",
    "ㄻ",
    "ㄼ",
    "ㄽ",
    "ㄾ",
    "ㄿ",
    "ㅀ",
    "ㅁ",
    "ㅂ",
    "ㅄ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ] as const;

  const baseCode = 44032; // '가'의 유니코드 값
  const decomposed = [];

  for (let char of str) {
    const charCode = char.charCodeAt(0) - baseCode;
    if (charCode >= 0 && charCode <= 11171) {
      const cho = Math.floor(charCode / 588);
      const jung = Math.floor((charCode % 588) / 28);
      const jong = charCode % 28;

      decomposed.push(chosung[cho], jungsung[jung]);
      if (jongsung[jong]) {
        decomposed.push(jongsung[jong]);
      }
    } else {
      decomposed.push(char);
    }
  }

  return decomposed.join("");
};
