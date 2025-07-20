import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type Heading2Props = ComponentProps<"h2">;
export function Heading2(props: Heading2Props) {
  const { className, ...rest } = props;

  return (
    <h2
      className={cx(
        "mt-8 mb-3 text-heading2 [&>code]:text-heading2",
        className,
      )}
      {...rest}
    />
  );
}
