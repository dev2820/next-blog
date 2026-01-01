import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type OrderedListProps = ComponentProps<"ol">;
export function OrderedList(props: OrderedListProps) {
  const { className, ...rest } = props;

  return <ol className={cx("list-decimal my-1", className)} {...rest} />;
}
