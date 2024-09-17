import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type Heading5Props = ComponentProps<"h5">;
export function Heading5(props: Heading5Props) {
  const { className, ...rest } = props;

  return (
    <h5
      className={cx(
        "mt-3 mb-1 text-heading5 font-semibold leading-normal",
        className,
      )}
      {...rest}
    />
  );
}
