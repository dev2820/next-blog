import { cx } from "@/utils/cx";
import { ComponentProps } from "react";
/**
 * TODO: leading이 tailwindMerge에서 지워지는 버그가 있음
 */
export type TagProps = ComponentProps<"span"> & {
  theme?: "primary" | "secondary";
  size?: "md";
  active?: boolean;
};

export function Tag(props: TagProps) {
  const {
    children,
    className,
    theme = "primary",
    size = "md",
    active,
    ...rest
  } = props;
  return (
    <span
      className={cx(
        "inline-block rounded-full duration-200",
        theme === "primary" && "bg-primary-100 hover:bg-primary-300",
        active && theme === "primary" && "bg-primary-300",
        theme === "secondary" && "bg-gray-100 hover:bg-gray-300 ",
        active && theme === "secondary" && "bg-gray-300",
        "font-light align-top",
        size === "md" && "min-h-10 text-md px-4 leading-10",
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
