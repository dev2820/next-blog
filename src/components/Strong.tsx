import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type StrongProps = ComponentProps<"strong">;
export function Strong(props: StrongProps) {
  const { className, ...rest } = props;

  return <strong className={cx("font-medium", className)} {...rest} />;
}
