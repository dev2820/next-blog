import { cx } from "@/utils/cx";
import { ComponentProps } from "react";
/**
 * TODO: leading이 tailwindMerge에서 지워지는 버그가 있음
 */
export type TagProps = ComponentProps<"span"> & {
  theme?: "primary" | "secondary";
};

export function Tag(props: TagProps) {
  const { children, className, theme = "primary", ...rest } = props;
  return (
    <span
      className={
        cx(
          "inline-block rounded-full border duration-200",
          theme === "primary" &&
            "text-primary-500 border-primary-500 hover:border-primary-600 hover:text-primary-600 ",
          theme === "secondary" &&
            "text-gray-400 border-gray-400 hover:border-gray-700 hover:text-gray-700",
          "font-light align-top",
          "min-h-5 text-xs px-3"
        ) + " leading-5"
      }
      {...rest}
    >
      {children}
    </span>
  );
}
