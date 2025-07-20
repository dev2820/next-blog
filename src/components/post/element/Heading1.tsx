import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type Heading1Props = ComponentProps<"h1">;
export function Heading1(props: Heading1Props) {
  const { className, ...rest } = props;

  return (
    <h1
      className={cx(
        "mt-10 mb-4 text-heading1 [&>code]:text-heading1",
        className,
      )}
      {...rest}
    />
  );
}
