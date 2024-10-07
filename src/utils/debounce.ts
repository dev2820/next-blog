/**
 * 지정된 시간이 지나기 전까지 함수 호출을 지연시키는 디바운스 함수입니다.
 * 지정된 시간이 지나면 마지막으로 호출된 함수를 실행합니다.
 * `immediate`가 `true`로 설정된 경우 첫 번째 호출에서 바로 함수가 실행됩니다.
 *
 * @param {Function} func - 디바운스 처리할 함수.
 * @param {number} wait - 함수 호출을 지연시킬 시간(ms).
 * @param {boolean} [immediate=false] - true인 경우, 함수가 지연되지 않고 즉시 호출됩니다.
 * @returns {(...args: any[]) => void} 디바운스 처리된 새로운 함수.
 *
 * @example
 * // 사용 예:
 * const debouncedFunction = debounce(() => console.log('실행됨!'), 300);
 * window.addEventListener('resize', debouncedFunction);
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;

    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}
