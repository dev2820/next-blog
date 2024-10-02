import { cx } from "@/utils/cx";
import type { ComponentProps } from "react";

export type CodeProps = ComponentProps<"code">;
export function Code(props: CodeProps) {
  const { className, ...rest } = props;

  return (
    <code
      className={cx(
        "rounded-md bg-gray-200 text-red-400",
        "py-1 px-2",
        className
      )}
      {...rest}
    />
  );
}
