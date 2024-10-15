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
          "inline-block rounded-full duration-200",
          theme === "primary" && "bg-primary-200 hover:bg-primary-400",
          theme === "secondary" &&
            "bg-gray-200 hover:bg-gray-400 hover:text-white",
          "font-light align-top",
          "min-h-6 text-xs px-3"
        ) + " leading-6"
      }
      {...rest}
    >
      {children}
    </span>
  );
}
