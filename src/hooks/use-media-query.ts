import { useState, useEffect } from "react";

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // 미디어 쿼리 리스트 생성
    const mediaQueryList = window.matchMedia(query);

    // 쿼리 변경 시 상태를 업데이트하는 함수
    const updateMatch = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // 초기 상태 설정
    setMatches(mediaQueryList.matches);

    // 이벤트 리스너 등록
    mediaQueryList.addEventListener("change", updateMatch);

    // cleanup 함수
    return () => {
      mediaQueryList.removeEventListener("change", updateMatch);
    };
  }, [query]);

  return matches;
};
