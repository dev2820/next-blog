import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type ParagraphProps = ComponentProps<"h1">;
export function Paragraph(props: ParagraphProps) {
  const { className, ...rest } = props;

  return (
    <p
      className={cx("font-light leading-normal mt-4 mb-2", className)}
      {...rest}
    />
  );
}
``;
