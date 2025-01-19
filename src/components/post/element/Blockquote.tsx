import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type BlockquoteProps = ComponentProps<"blockquote">;
export function Blockquote(props: BlockquoteProps) {
  const { className, ...rest } = props;

  return (
    <blockquote
      className={cx(
        "my-4 border-l-4 border-primary p-6 bg-layer-fill [&_*:first-child]:mt-0 [&_*:last-child]:mb-0",
        className
      )}
      {...rest}
    />
  );
}
