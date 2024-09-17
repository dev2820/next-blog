import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type BlockquoteProps = ComponentProps<"blockquote">;
export function Blockquote(props: BlockquoteProps) {
  const { className, ...rest } = props;

  return (
    <blockquote
      className={cx(
        "border-l-4 border-green-500 p-4 bg-gray-100 text-gray-700",
        className,
      )}
      {...rest}
    />
  );
}
