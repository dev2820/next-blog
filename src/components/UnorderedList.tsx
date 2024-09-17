import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type UnorderedListProps = ComponentProps<"ul">;
export function UnorderedList(props: UnorderedListProps) {
  const { className, ...rest } = props;

  return <ul className={cx("list-disc py-4", className)} {...rest} />;
}
