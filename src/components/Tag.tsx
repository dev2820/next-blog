import { cx } from "@/utils/cx";
import { ComponentProps } from "react";
/**
 * TODO: leading이 tailwindMerge에서 지워지는 버그가 있음
 */
export type TagProps = Omit<ComponentProps<"span">, "children"> & {
  text: string;
};

export function Tag(props: TagProps) {
  const { text, className, ...rest } = props;
  return (
    <span
      className={
        cx(
          "inline-block rounded-full border border-gray-400 text-gray-400",
          "hover:border-gray-700 hover:text-gray-700 duration-200",
          "font-light align-top",
          "min-h-5 text-xs px-3"
        ) + " leading-5"
      }
      {...rest}
    >
      {text}
    </span>
  );
}
