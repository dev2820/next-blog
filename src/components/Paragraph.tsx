import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type ParagraphProps = ComponentProps<"h1">;
export function Paragraph(props: ParagraphProps) {
  const { className, ...rest } = props;

  return (
    <p
      className={cx(
        "text-paragraph font-light leading-normal pt-6 pb-2",
        className,
      )}
      {...rest}
    />
  );
}
