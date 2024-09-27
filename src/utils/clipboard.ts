import { Result } from "@/types/monad";

/**
 * 텍스트를 클립보드에 복사하는 함수
 * @param {string} text - 복사할 텍스트
 * @returns {Promise<void>}
 */
export const copyTextToClipboard = async (
  text: string
): Promise<Result<boolean, Error>> => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);

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

  // Clipboard API를 지원하지 않는 경우
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed"; // 화면에 보이지 않도록
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    const successful = document.execCommand("copy");
    document.body.removeChild(textarea);
    if (successful) {
      return {
        isFailed: false,
        value: true,
        error: null,
      };
    } else {
      return {
        isFailed: true,
        value: null,
        error: new Error("failed to copy"),
      };
    }
  } catch (err) {
    document.body.removeChild(textarea);
    return {
      isFailed: true,
      value: null,
      error: err as Error,
    };
  }
};
