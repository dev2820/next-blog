import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type TagProps = Omit<ComponentProps<"span">, "children"> & {
  text: string;
  size?: "sm" | "md";
};
export function Tag(props: TagProps) {
  const { text, size = "md", className, ...rest } = props;
  return (
    <span
      className={cx(
        "inline-block rounded-full border border-white px-4",
        "font-medium align-top",
        size === "sm" && "min-h-5 leading-5 text-sm",
        size === "md" && "min-h-7 leading-7 text-md"
      )}
      {...rest}
    >
      {text}
    </span>
  );
}
