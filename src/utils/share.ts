import { Result } from "@/types/monad";
import { isNotNil } from "@/utils/predicate";

/**
 * 콘텐츠를 공유하는 함수
 * @param {ShareData} shareData - 공유할 데이터 (title, text, url, files)
 */
export const share = async (
  shareData: ShareData
): Promise<Result<boolean, Error>> => {
  if (isNotNil(navigator.share)) {
    if (navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return {
          isFailed: false,
          value: true,
          error: null,
        };
      } catch (err) {
        return {
          isFailed: true,
          value: null,
          error: err as Error,
        };
      }
    }
  }

  return {
    isFailed: true,
    value: null,
    error: new Error("share is not supported in this browser"),
  };
};
