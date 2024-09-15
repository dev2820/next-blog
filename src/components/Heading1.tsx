import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type Heading1Props = ComponentProps<"h1">;
export function Heading1(props: Heading1Props) {
  const { className, ...rest } = props;

  return (
    <h1
      className={cx("text-heading1 font-bold leading-normal", className)}
      {...rest}
    />
  );
}
