import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type PageHeadingProps = ComponentProps<"h2">;
export function PageHeading(props: PageHeadingProps) {
  const { className, ...rest } = props;
  return (
    <h2
      className={cx("text-4xl font-bold mt-16 mb-8 lg:text-5xl", className)}
      {...rest}
    />
  );
}
