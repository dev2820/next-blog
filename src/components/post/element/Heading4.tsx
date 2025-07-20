import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type Heading4Props = ComponentProps<"h4">;
export function Heading4(props: Heading4Props) {
  const { className, ...rest } = props;

  return (
    <h4
      className={cx(
        "mt-5 mb-2 text-heading4 [&>code]:text-heading4",
        className,
      )}
      {...rest}
    />
  );
}
