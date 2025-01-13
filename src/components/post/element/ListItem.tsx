import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type ListItemProps = ComponentProps<"li">;
export function ListItem(props: ListItemProps) {
  const { className, ...rest } = props;

  return (
    <li
      className={cx("text-paragraph leading-normal py-1 ml-6", className)}
      {...rest}
    />
  );
}
