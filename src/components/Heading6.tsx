import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type Heading6Props = ComponentProps<"h6">;
export function Heading6(props: Heading6Props) {
  const { className, ...rest } = props;

  return (
    <h6
      className={cx("text-heading6 font-semibold leading-normal", className)}
      {...rest}
    />
  );
}
