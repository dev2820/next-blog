import { useEffect, useState } from "react";

/**
 * 주어진 값이 변경되면 지정된 지연 시간 후에 값을 업데이트하는 디바운스 훅입니다.
 *
 * @param {T} value - 디바운스 처리할 값.
 * @param {number} delay - 디바운스 시간(밀리초).
 * @returns {T} 디바운스 처리된 값.
 *
 * @example
 * // 사용 예:
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 *
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     // 디바운스 처리된 검색어로 API 호출 등을 수행
 *     console.log(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 타이머를 설정하여 지연 시간 이후에 값을 업데이트
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 이전 타이머를 정리하여 새로운 값이 설정되면 기존 타이머를 초기화
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // 값이나 지연 시간이 변경될 때마다 이펙트가 실행됨

  return debouncedValue;
}
