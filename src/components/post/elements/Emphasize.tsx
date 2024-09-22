import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type EmphasizeProps = ComponentProps<"em">;
export function Emphasize(props: EmphasizeProps) {
  const { className, ...rest } = props;

  return <em className={cx(className)} {...rest} />;
}
