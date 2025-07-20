import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type Heading3Props = ComponentProps<"h3">;
export function Heading3(props: Heading3Props) {
  const { className, ...rest } = props;

  return (
    <h3
      className={cx(
        "mt-7 mb-2 text-heading3 [&>code]:text-heading3",
        className,
      )}
      {...rest}
    />
  );
}
