import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type ParagraphProps = ComponentProps<"h1">;
export function Paragraph(props: ParagraphProps) {
  const { className, ...rest } = props;

  return (
    <p
      className={cx(
        "text-paragraph font-light leading-normal pt-4 pb-4",
        className,
      )}
      {...rest}
    />
  );
}
