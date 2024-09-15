import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type Heading3Props = ComponentProps<"h3">;
export function Heading3(props: Heading3Props) {
  const { className, ...rest } = props;

  return (
    <h2
      className={cx("text-heading3 font-semibold leading-normal", className)}
      {...rest}
    />
  );
}
