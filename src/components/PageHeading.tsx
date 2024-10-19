import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type PageHeadingProps = ComponentProps<"h2">;
export function PageHeading(props: PageHeadingProps) {
  const { className, ...rest } = props;
  return <h2 className={cx("text-5xl font-bold mb-8", className)} {...rest} />;
}
