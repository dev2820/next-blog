import type { Post } from "@/types/post";
import Fuse, {
  type FuseResult,
  type Expression,
  type IFuseOptions,
} from "fuse.js";

/**
 * @see https://www.fusejs.io/api/options.html
 */
const options: IFuseOptions<Post> = {
  includeScore: true,
  includeMatches: true,
  shouldSort: true,
  minMatchCharLength: 2,
  findAllMatches: false,
  keys: ["data.title", "data.tags", "data.summary", "content"],
  // getFn: (obj, path) => {
  //   const value = Fuse.config.getFn(obj, path);
  //   return decomposeHangul(value); // 한글 자모 분리
  // },
};

/**
 * TODO: Fix type
 */
export const search = (list: Post[], keyword: string | Expression) => {
  const fuse = new Fuse(list, options);

  return fuse.search(keyword);
};

export const createSearch = (
  list: Post[]
): ((keyword: string) => FuseResult<Post>[]) => {
  const fuse = new Fuse(list, options);

  return (keyword: string) => {
    return fuse.search(keyword);
  };
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
