import { cx } from "@/utils/cx";
import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentProps,
} from "react";
import "@/assets/prism/prism.css";
/**
 * TODO: prism font change
 */
export type CodeBlockProps = ComponentProps<"pre">;
export function CodeBlock(props: CodeBlockProps) {
  const { className, children, ...rest } = props;
  const languageClassName = extractLanguageStrings(className ?? "").join(" ");
  const child = Children.only(children);
  const codeBlock = isValidElement<HTMLElement>(child)
    ? cloneElement(child, {
        className: languageClassName,
      })
    : child;

  return (
    <pre className={cx("font-monospace rounded-md", className)} {...rest}>
      {codeBlock}
    </pre>
  );
}

function extractLanguageStrings(inputString: string) {
  // 정규식으로 "language-"로 시작하는 문자열을 찾음
  const regex = /language-[\w-]+/g;

  // 문자열에서 매칭되는 모든 결과를 배열로 반환
  const matches = inputString.match(regex);

  // 결과가 없으면 빈 배열을 반환
  return matches || [];
}
