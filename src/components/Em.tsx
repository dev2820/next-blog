import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type EmProps = ComponentProps<"em">;
export function Em(props: EmProps) {
  const { className, ...rest } = props;

  return <em className={cx(className)} {...rest} />;
}
